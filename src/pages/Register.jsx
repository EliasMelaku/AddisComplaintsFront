import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Some imoportant Libraries for handling form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { userSchema } from "../Validations";
import { toast } from "react-toastify";

import ReCAPTCHA from "react-google-recaptcha";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

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
        name: event.name,
        email: event.email,
        password: event.password,
        token: token,
      };
      // console.log(data);
      axios
        .post("/auth/register", data)
        .then((res) => {
          toast.success("Account Created Successfully", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          navigate("/dashboard");
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
    resolver: yupResolver(userSchema),
  });
  return (
    <div className="background authBackground">
      <h2 className="authBrand">Addis Complaints</h2>
      <form
        className="loginFormContainer"
        onSubmit={handleSubmit(tryLogin)}
        style={{
          height: "min-content",
          minHeight: "77vh",
          marginTop: "5rem",
          width: "30%",
        }}
      >
        <h2
          style={{ marginLeft: "5rem", marginTop: "0", marginBottom: "0rem" }}
        >
          Sign Up
        </h2>
        <div className="inputs">
          <label htmlFor="email">Full Name: </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="John Doe"
            {...register("name")}
          />
          <p className="error loginError">{errors.name?.message}</p>
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
          <label htmlFor="password">Confirm Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            {...register("cPassword")}
          />
          <p className="error loginError">{errors.cPassword?.message}</p>
          <input type="submit" value="Register" className="submitBtn" />
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_ReCAPTCHA_SITE_KEY}
            ref={captchaRef}
            aria-required={true}
          />
          <p>
            Already have an account?{" "}
            <a
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
