import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Some imoportant Libraries for handling form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../Validations";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-toastify";

import { LoginContext } from "../LoginContext";

const Login = () => {
  useEffect(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useContext(LoginContext);

  const captchaRef = useRef(null);

  function tryLogin(event) {
    const token = captchaRef.current.getValue();
    if (token === "") {
      toast.error("Please perform Captcha", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const data = {
        email: event.email,
        password: event.password,
        token: token,
      };
      // console.log(data);
      axios
        .post("/auth/login", data)
        .then((res) => {
          setUser(res.data);
          if (res.data.role === "admin") {
            navigate("/admin_dashboard");
          } else {
            navigate("/dashboard");
          }
        })
        .catch((err) =>
          toast.error(err.response.data, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        );
      captchaRef.current.reset();
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className="background authBackground">
      <h2 className="authBrand">Addis Complaints</h2>
      <div className="loginFormContainer">
        <h2 style={{ marginLeft: "5rem" }}>Login</h2>
        <form className="inputs" onSubmit={handleSubmit(tryLogin)}>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          <p className="error loginError">{errors.email?.message}</p>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className="error loginError">{errors.password?.message}</p>
          <input
            type="submit"
            value="Login"
            className="submitBtn"
            style={{ marginBottom: "0.5rem" }}
          />
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_ReCAPTCHA_SITE_KEY}
            ref={captchaRef}
            aria-required={true}
          />
          <p>
            Don't have an account?{" "}
            <a
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
