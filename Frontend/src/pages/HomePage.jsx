import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CONSTANTS from "../components/common/constants";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const employeesPerPage = 4;

  useEffect(() => {
    axios
      .get(`${CONSTANTS.BASE_PATH}/api/employees`)
      .then((response) => {
        const { employees, totalCount } = response.data.data;
        setEmployees(employees);
        setTotalCount(totalCount);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleEditClick = (id) => {
    const encryptedId = encryptId(id);
    navigate(`/edit-employee/${encryptedId}`);
  };

  const encryptId = (id) => {
    const secretKey = CONSTANTS.SECRET_KEY;
    const encrypted = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
    return encodeURIComponent(encrypted);
  };

  const decryptId = (encryptedId) => {
    const secretKey = CONSTANTS.SECRET_KEY;
    const decodedId = decodeURIComponent(encryptedId);
    const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const deleteEmployee = (id) => {
    const decryptedId = decryptId(id);
    const userConfirmed = confirm(
      "Are you sure you want to delete this record?"
    );
    if (userConfirmed) {
      axios
        .delete(`${CONSTANTS.BASE_PATH}/api/employees/${decryptedId}`)
        .then(() => {
          setEmployees(
            employees.filter((emp) => emp.id !== parseInt(decryptedId))
          );
          toast.success("One record deleted");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    } else {
      toast.warning("Delete operation cancelled");
    }
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(totalCount / employeesPerPage); // Use totalCount for pagination

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Employees</h1>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.age}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  onClick={() => handleEditClick(emp.id)} // Trigger navigation on click
                  className="btn btn-primary btn-sm me-2"
                >
                  <i className="bi bi-pencil-fill"></i> Edit
                </button>
                <button
                  onClick={() => deleteEmployee(encryptId(emp.id))}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash3-fill"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
