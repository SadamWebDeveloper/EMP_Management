import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const handleEmployeeRoute = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split("/")[3]

  if (req.method == "GET" && url.pathname.startsWith("/api/employees") && !id) {
    getEmployees(req, res);
    return true;
  } else if (req.method == "GET" && url.pathname.startsWith("/api/employees") && id) {
    getEmployee(req, res, id);
    return true;
  } else if (
    req.method == "POST" &&
    url.pathname.startsWith("/api/employees")
  ) {
    addEmployee(req, res);
    return true;
  } else if (
    req.method == "PUT" &&
    url.pathname.startsWith("/api/employees") &&
    id
  ) {
    updateEmployee(req, res, id);
    return true;
  } else if (
    req.method == "DELETE" &&
    url.pathname.startsWith("/api/employees") &&
    id
  ) {
    deleteEmployee(req, res, id);
    return true;
  } else {
    return false;
  }
};

export default handleEmployeeRoute;
