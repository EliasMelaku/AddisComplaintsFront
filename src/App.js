import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  AdminDashboard,
  NewFeedback,
  EditFeedback,
} from "./pages";
import { ToastContainer, Zoom } from "react-toastify";

import { useContext, useEffect } from "react";
import { LoginContext } from "./LoginContext";
import GuardedRoute from "./components/GuardedRoute";

function App() {
  const [user, setUser] = useContext(LoginContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuardedRoute isAllowed={user !== null} redirectTo="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <GuardedRoute
              isAllowed={user !== null && user.role === "user"}
              redirectTo={user === null ? "/login" : "/admin_dashboard"}
            >
              <Dashboard />
            </GuardedRoute>
          }
        />
        <Route
          path="/admin_dashboard"
          element={
            <GuardedRoute
              isAllowed={user !== null && user.role === "admin"}
              redirectTo={user === null ? "/login" : "/dashboard"}
            >
              <AdminDashboard />
            </GuardedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <GuardedRoute
              isAllowed={user !== null && user.role === "user"}
              redirectTo={user === null ? "/login" : "/admin_dashboard"}
            >
              <NewFeedback />
            </GuardedRoute>
          }
        />
        <Route
          path="/feedback/:id"
          element={
            <GuardedRoute
              isAllowed={user !== null && user.role === "user"}
              redirectTo={user === null ? "/login" : "/admin_dashboard"}
            >
              <EditFeedback />
            </GuardedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </BrowserRouter>
    // <div>
    //   <input type="text"></input>
    //   <input type="text" name="_csrf" value={csrfToken}></input>
    //   <input
    //     type="button"
    //     value={"Send"}
    //     onClick={() => {
    //       axios
    //         .post("/feedback/process")
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));
    //     }}
    //   ></input>
    // </div>
  );
}

export default App;
