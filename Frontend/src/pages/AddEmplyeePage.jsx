import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CONSTANTS from "../components/common/constants";

const AddEmployeePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    department: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    axios
      .post(`${CONSTANTS.BASE_PATH}/api/employees`, formData)
      .then(() => {
        toast.success("Employee Added Successfully");
        navigate("/");
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <div className="container mt-5">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
