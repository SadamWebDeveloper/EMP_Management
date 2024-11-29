import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const handleEmployeeRoute = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathSegments = url.pathname.split("/").filter(Boolean); // Split and remove empty segments
  const basePath = `/${pathSegments[0] || ""}/${pathSegments[1] || ""}`;
  const id = pathSegments[2];

  // Strict route validation
  if (basePath === "/api/employees") {
    switch (req.method) {
      case "GET":
        if (id) {
          getEmployee(req, res, id);
        } else {
          getEmployees(req, res);
        }
        return true;

      case "POST":
        addEmployee(req, res);
        return true;

      case "PUT":
        if (!id) {
          return false;
        }
        updateEmployee(req, res, id);
        return true;

      case "DELETE":
        if (!id) {
          return false;
        }
        deleteEmployee(req, res, id);
        return true;

      default:
        return false;
    }
  }

  return false;
};

export default handleEmployeeRoute;
