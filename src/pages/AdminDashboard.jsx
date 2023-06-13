import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { LoginContext } from "../LoginContext";
import axios from "axios";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UsersTable from "../components/UsersTable";
import FeedbacksTable from "../components/FeedbacksTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="background authBackground">
      <Header />
      <div className="dashContainer">
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#eceff1",
            display: "flex",
            borderRadius: "10px",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Users" />
            <Tab label="Feedbacks" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <UsersTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FeedbacksTable />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default AdminDashboard;
