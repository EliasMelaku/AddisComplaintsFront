import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  Dashboard,
  AdminDashboard,
  NewFeedback,
  EditFeedback,
} from "./pages";
import { ToastContainer, Zoom } from "react-toastify";

import { LoginProvider } from "./LoginContext";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/feedback" element={<NewFeedback />} />
          <Route path="/feedback/:id" element={<EditFeedback />} />
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
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
