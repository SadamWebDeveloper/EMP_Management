import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CONSTANTS from "../components/common/constants";

const dummyData = [
  { id: 1, name: "John Doe", age: 28, position: "Software Engineer", department: "Development" },
  { id: 2, name: "Jane Smith", age: 34, position: "Product Manager", department: "Product" },
  { id: 3, name: "Michael Johnson", age: 41, position: "HR Specialist", department: "Human Resources" },
  { id: 4, name: "Emily Davis", age: 25, position: "UX Designer", department: "Design" },
  { id: 5, name: "Chris Brown", age: 30, position: "Marketing Specialist", department: "Marketing" },
  { id: 6, name: "John Doe", age: 28, position: "Software Engineer", department: "Development" },
  { id: 7, name: "Jane Smith", age: 34, position: "Product Manager", department: "Product" },
  { id: 8, name: "Michael Johnson", age: 41, position: "HR Specialist", department: "Human Resources" },
  { id: 9, name: "Emily Davis", age: 25, position: "UX Designer", department: "Design" },
  { id: 10, name: "Chris Brown", age: 30, position: "Marketing Specialist", department: "Marketing" },
  { id: 11, name: "John Doe", age: 28, position: "Software Engineer", department: "Development" },
  { id: 12, name: "Jane Smith", age: 34, position: "Product Manager", department: "Product" },
  { id: 13, name: "Michael Johnson", age: 41, position: "HR Specialist", department: "Human Resources" },
  { id: 14, name: "Emily Davis", age: 25, position: "UX Designer", department: "Design" },
  { id: 15, name: "Chris Brown", age: 30, position: "Marketing Specialist", department: "Marketing" },
  { id: 16, name: "John Doe", age: 28, position: "Software Engineer", department: "Development" },
  { id: 17, name: "Jane Smith", age: 34, position: "Product Manager", department: "Product" },
  { id: 18, name: "Michael Johnson", age: 41, position: "HR Specialist", department: "Human Resources" },
  { id: 19, name: "Emily Davis", age: 25, position: "UX Designer", department: "Design" },
  { id: 20, name: "Chris Brown", age: 30, position: "Marketing Specialist", department: "Marketing" },
  { id: 21, name: "John Doe", age: 28, position: "Software Engineer", department: "Development" },
  { id: 22, name: "Jane Smith", age: 34, position: "Product Manager", department: "Product" },
  { id: 23, name: "Michael Johnson", age: 41, position: "HR Specialist", department: "Human Resources" },
  { id: 24, name: "Emily Davis", age: 25, position: "UX Designer", department: "Design" },
  { id: 25, name: "Chris Brown", age: 30, position: "Marketing Specialist", department: "Marketing" },
];


const HomePage = () => {
  const [employees, setEmployees] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 4;

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

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
    axios
      .delete(`http://localhost:5000/employees/${decryptedId}`)
      .then(() => setEmployees(employees.filter((emp) => emp.id !== parseInt(decryptedId))))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

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
                <Link
                  to={`/edit-employee/${encryptId(emp.id)}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  <i className="bi bi-pencil-fill"></i> Edit
                </Link>
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
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
