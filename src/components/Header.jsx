import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const logout = () => {
    axios
      .post("/auth/logout")
      .then((res) => toast.success("Logged Out", { autoClose: 2000 }))
      .catch((err) => toast.error("Error Logging out", { autoClose: 3000 }));
  };

  const navigate = useNavigate();
  return (
    <div>
      <h2
        className="brand"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Addis Complaints
      </h2>

      <p
        className="logout"
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout <i className="fa fa-right-from-bracket"></i>
      </p>
    </div>
  );
};

export default Header;
