import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
  return (
    <div className="middle-of-screen">
      <Link className="underline-remove" to="/dashboard">
        <button className="btn-dashboard">Go to Dashboard</button>
      </Link>
    </div>
  );
}

export default Dashboard;
