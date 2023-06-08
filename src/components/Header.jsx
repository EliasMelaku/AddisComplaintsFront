import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
          navigate("/login");
        }}
      >
        Logout <i className="fa fa-right-from-bracket"></i>
      </p>
    </div>
  );
};

export default Header;
