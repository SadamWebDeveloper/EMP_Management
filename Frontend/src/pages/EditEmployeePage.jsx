import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";
import CONSTANTS from "../components/common/constants";

const EditEmployeePage = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);

  const decryptId = (encryptedId) => {
    const secretKey = CONSTANTS.SECRET_KEY;
    const decodedId = decodeURIComponent(encryptedId); // Decode the URL-safe string
    const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Fetch employee details on component mount
  useEffect(() => {
    const decryptedId = decryptId(id);
    console.log(decryptedId);

    setFormData({
      id: 1,
      name: "John Doe",
      age: 28,
      position: "Software Engineer",
      department: "Development",
    });

    axios
      .get(`${CONSTANTS.BASE_PATH}/api/employees/${decryptedId}`)
      .then((response) => {
        console.log(response);
        setFormData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const decryptedId = decryptId(id);
    console.log(decryptedId);
    axios
      .put(`${CONSTANTS.BASE_PATH}/api/employees/${decryptedId}`, formData)
      .then(() => {
        toast.success("Updated Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Edit Employee</h1>
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
        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployeePage;
