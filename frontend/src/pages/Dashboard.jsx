import React from "react";
import AgentForm from "../components/AgentForm";
import UploadList from "../components/UploadList";
import "./Dashboard.css";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-content">
        <AgentForm />
        <UploadList />
      </div>
    </div>
  );
};

export default Dashboard;