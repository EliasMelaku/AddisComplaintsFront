import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import { toast } from "react-toastify";

const GuardedRoute = ({ isAllowed, redirectTo, children }) => {
  const [user, _] = useContext(LoginContext);

  if (!isAllowed) {
    toast.error("You are not allowed to access this page", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return <Navigate to={redirectTo} replace />;
  }

  if (children) return children;

  if (user.role === "admin") return <Navigate to="/admin_dashboard" replace />;

  return <Navigate to="/dashboard" replace />;
};

export default GuardedRoute;
