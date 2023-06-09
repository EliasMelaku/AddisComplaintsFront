import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { LoginContext } from "../LoginContext";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     title: "Some Title",
//     comment:
//       "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
//     pdf: "Link To Pdf",
//   },
//   {
//     id: 2,
//     title: "Some Title 2",
//     comment:
//       "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
//     pdf: null,
//   },
// ];

const Dashboard = () => {
  const alertError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login");
  };

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [LoginStatus, setLoginStatus] = useContext(LoginContext);
  // const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    if (LoginStatus === true) {
      getFeedback();
    } else {
      alertError("You need to Login");
    }
  }, []);

  const body = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  const getFeedback = () => {
    axios
      .post("/feedback", body)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    toast.error("Feedback Deleted", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="background authBackground">
      <Header />
      <div className="userSection">
        <p>Hi, {localStorage.getItem("name")}</p>
        <input
          type="submit"
          value="+ Submit Feedback"
          className="newFeedback"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/feedback");
          }}
        />
      </div>
      <div className="dashContainer">
        <>
          {data.map((feedback, index) => (
            <div className="feedbackCard">
              <div className="cardTop">
                <h2 className="cardTitle">{feedback.title}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "4rem",
                  }}
                >
                  <i
                    className="edit fa fa-pen-to-square"
                    onClick={() => {
                      navigate(`/feedback/${feedback.id}`);
                    }}
                  ></i>
                  <div
                    className="delete fa fa-trash-can"
                    onClick={() => {
                      handleDelete();
                    }}
                  ></div>
                </div>
              </div>
              <p className="cardComment">{feedback.comment}</p>
              <p className="cardPdfLink">{feedback.pdf || "No Pdf Uploaded"}</p>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default Dashboard;
