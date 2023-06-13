import React, { useEffect, useState } from "react";

import NewFeedback from "../pages/NewFeedback";
import EditFeedback from "../pages/EditFeedback";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import axios from "axios";
// import data from "../pages/Dashboard";

const data = {
  id: 1,
  name: "John Doe",
  email: "sample@gmail.com",
  title: "Some Title",
  comment:
    "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
};

const FeedbackForm = ({ edit, id }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileFile, setSelectedFileFile] = useState();

  // const [data, setData] = useState({});

  // useEffect(() => {
  //   if (edit === true) {
  //     const body = {
  //       id: id,
  //     };

  //     axios
  //       .post("/feedback/single", body)
  //       .then((response) => setData(response.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  const [comment, setComment] = useState("");

  const submitFeedback = () => {
    if (comment !== "") {
      // alert(selectedFile.endsWith(".pdf"));
      const formData = new FormData();
      if (selectedFileFile !== undefined) {
        if (selectedFileFile.type === "application/pdf") {
          formData.append("pdf", selectedFileFile);
        } else {
          toast.error("Wrong File Submitted", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
      formData.append("name", localStorage.getItem("name"));
      formData.append("email", localStorage.getItem("email"));
      formData.append("comment", comment);
      // const formData = new FormData();
      axios
        .post("/feedback/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success("Feedback Submitted", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
      for (const value of formData.values()) {
        console.log(value);
      }
      // toast.success("Feedback Submitted", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    } else if (comment === "") {
      toast.error("Comment is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("File or comment is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const content = edit === true ? "Edit" : "New";
  return (
    <div className="background authBackground">
      <Header />
      <div
        className="loginFormContainer"
        style={{
          width: "50rem",
          height: "fit-content",
          marginTop: "3rem",
          marginLeft: "5rem",
        }}
      >
        <h2 style={{ marginLeft: "5rem" }}>
          {edit === true ? "Edit Your Feedback " : "Submit New Feedback"}
        </h2>
        <div className="myGrid">
          <div className="inputs" style={{ width: "55%", marginRight: "2rem" }}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="email"
              // placeholder={"John Doe"}
              value={localStorage.getItem("name")}
              disabled={true}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={localStorage.getItem("email")}
              disabled={true}
            />
            {/* <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Short Title Describing the comment"
              defaultValue={edit === true ? data.title : ""}
            /> */}
            <label htmlFor="comment">Comment: </label>
            <textarea
              style={{ resize: "none", border: "none", marginTop: "0.25rem" }}
              name="comment"
              id="comment"
              cols="30"
              rows="10"
              defaultValue={edit === true ? data.comment : ""}
              disabled={selectedFile}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></textarea>
            <input
              type="button"
              value={edit === true ? "Edit Feedback" : "Submit Feedback"}
              className="submitBtn"
              onClick={() => {
                submitFeedback();
              }}
            />
          </div>
          <div
            className="fileUpload"
            style={{
              border: "solid 1px black",
              width: "35%",
              height: "50vh",
              marginTop: "2.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input
              type="file"
              accept="application/pdf"
              style={{
                width: "100%",
                opacity: "0",
                position: "absolute",
                cursor: "pointer",
                zIndex: 99,
                height: "100%",
              }}
              onChange={(event) => {
                setSelectedFile(
                  event.target.files[0] !== undefined
                    ? event.target.files[0].name
                    : "No File Chosen"
                );
                setSelectedFileFile(event.target.files[0]);
              }}
            />
            {selectedFile || "No File Selected"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
