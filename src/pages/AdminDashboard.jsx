import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const users = [
  { name: "John", email: "John@email.com" },
  { name: "John", email: "John@email.com" },
  { name: "John", email: "John@email.com" },
  { name: "John", email: "John@email.com" },
];
const feedbacks = [
  {
    name: "John",
    email: "John@email.com",
    title: "Title",
    comment:
      "lorem episoum loerm saldkfjasl; fsdidowd aldkow dkorjd lorem pisoum loerm saldkf lorem episoum loerm saldkfjasl; fsdidowd aldkow dkorjd fsdidowd aldkow dkorjd ",
  },
  {
    name: "John",
    email: "John@email.com",
    title: "Title",
    comment: "lorem episoum loerm saldkfjasl; fsdidowd aldkow dkorjd ",
  },
  {
    name: "John",
    email: "John@email.com",
    title: "Title",
    comment: "lorem episoum loerm saldkfjasl; fsdidowd aldkow dkorjd ",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [shown, setShown] = useState(true);
  // const [tab2, setTab2] = useState("hide");

  const handleDelete = () => {};

  return (
    <div className="background authBackground">
      <Header />
      <div className="userSection">
        <p>Hi Admin John</p>
      </div>
      <div className="tabbedSection">
        <div
          className="tabHeader tabH1"
          onClick={() => {
            setShown(true);
            // setTab2("hide");
          }}
        >
          Users
        </div>
        <div
          className="tabHeader tabH2"
          onClick={() => {
            setShown(false);
            // setTab2("show");
          }}
        >
          Feedbacks
        </div>

        <div className={`tabs tab1 ${shown}`}>
          <h1>Users</h1>
          {users.map((user, index) => (
            <div className="name">{user.name + " " + user.email}</div>
          ))}
        </div>
        <div className={`tabs tab2 ${!shown}`}>
          <h1>Feedbacks</h1>
          <div className="adminFeedbacks">
            {feedbacks.map((feedback, index) => (
              <div
                className="feedbackCard"
                style={{
                  width: "14rem",
                  backgroundColor: "rgb(225, 225, 225)",
                  padding: "1rem",
                }}
              >
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
                    <div
                      className="delete fa fa-trash-can"
                      onClick={() => {
                        handleDelete();
                      }}
                    ></div>
                  </div>
                </div>
                <p className="cardComment" style={{ fontSize: "0.85rem" }}>
                  {feedback.comment}
                </p>
                <p className="cardPdfLink">
                  {feedback.pdf || "No Pdf Uploaded"}
                </p>
                <p className="cardAuthor">{feedback.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
