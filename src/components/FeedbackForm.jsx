import React, { useContext, useEffect, useState } from "react";

import NewFeedback from "../pages/NewFeedback";
import EditFeedback from "../pages/EditFeedback";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import axios from "axios";
import { LoginContext } from "../LoginContext";
// import data from "../pages/Dashboard";

const data = {
  id: 1,
  name: "John Doe",
  email: "sample@gmail.com",
  title: "Some Title",
  comment:
    "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
};

const FeedbackForm = ({ edit }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileFile, setSelectedFileFile] = useState();
  const [user, _] = useContext(LoginContext);
  const { id } = useParams();

  // const [data, setData] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    // console.log(id);
    if (edit === true) {
      const body = {
        id: id,
      };

      axios
        .post("/feedback/single", body)
        .then((response) => {
          // console.log(response.data.comment);

          console.log("response");
          setSelectedFile(response.data.pdf);
          setComment(response.data.comment);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    axios
      .get("/feedback/csrf-token")
      .then((response) => {
        // console.log(response);
        // token = document
        //   .querySelector('meta[name="csrf-token"]')
        //   .getAttribute("content");
        // setCsrfToken(document.cookie._csrf);
      })
      .catch((err) => console.log(err));
  }, []);

  const clearAntiCsrf = () => {
    axios
      .post("/feedback/clear")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const editFeedback = () => {
    if (comment !== "") {
      // alert(selectedFile.endsWith(".pdf"));
      const formData = new FormData();
      if (selectedFileFile !== undefined) {
        if (selectedFileFile.type === "application/pdf") {
          formData.append("pdf", selectedFileFile);
        } else {
          toast.error("Wrong File Submitted", {
            position: "top-center",
            autoClose: 1000,
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
      formData.append("id", id);
      // const formData = new FormData();
      axios
        .put(`/feedback/update/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success("Feedback Updated", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          clearAntiCsrf();
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
      for (const value of formData.values()) {
        // console.log(value);
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
        position: "top-right",
        autoClose: 1000,
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
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
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
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
      formData.append("name", user.name);
      formData.append("email", user.email);
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
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          clearAntiCsrf();
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
        autoClose: 1000,
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
        autoClose: 1000,
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
              value={user.name}
              disabled={true}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={user.email}
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
              defaultValue={edit === true ? comment : ""}
              // disabled={selectedFile}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></textarea>
            <input
              type="button"
              value={edit === true ? "Edit Feedback" : "Submit Feedback"}
              className="submitBtn"
              onClick={() => {
                edit === true ? editFeedback() : submitFeedback();
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
              defaultValue={edit === true ? selectedFile : null}
            />
            {selectedFile || "No File Selected"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
