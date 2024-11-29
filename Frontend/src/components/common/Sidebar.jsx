import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeImage from "../../../public/favicon.ico";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        backgroundColor: "#f8f9fa",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      {/* Logo Section */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img
          src={HomeImage}
          alt="Home Icon"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
        <h4>Employee Management</h4>
      </div>

      {/* Navigation Links */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className="btn btn-link nav-link text-start"
            style={{ padding: "20px 0" }}
            onClick={() => navigate("/")}
          >
            <i
              class="bi bi-house-check-fill"
              style={{
                marginRight: "10px",
                fontSize: "25px",
                color: "#278aa9",
              }}
            ></i>{" "}
            Employee List {/* Using list icon */}
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link nav-link text-start"
            style={{ padding: "10px 0" }}
            onClick={() => navigate("/add-employee")}
          >
            <i
              className="bi bi-person-fill-add"
              style={{
                marginRight: "10px",
                fontSize: "25px",
                color: "#278aa9",
              }}
            ></i>{" "}
            Add Employee {/* Using add person icon */}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
