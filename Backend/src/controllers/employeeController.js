import Employee from "../models/employeeModel.js";
import { parseRequest, validateParams } from "../utils/helper.js";

// rules for input validation
const rules = {
  name: { required: true, type: "string" },
  age: { required: true, type: "number" },
  position: { required: true, type: "string" },
  department: { required: true, type: "string" },
};

export const getEmployees = async (req, res) => {
  const employees = await Employee.getAll();
  res.end(
    JSON.stringify({
      statusCode: 200,
      message: "Employees List",
      data: employees,
    })
  );
};

export const getEmployee = async (req, res, id) => {
  const detail = await Employee.get(id);
  if (detail) {
    res.end(
      JSON.stringify({
        statusCode: 200,
        message: "Employee detail availabale",
        data: detail,
      })
    );
  } else {
    res.end(
      JSON.stringify({
        statusCode: 203,
        message: "Employee detail not available",
      })
    );
  }
};

export const addEmployee = async (req, res, id) => {
  try {
    const parsed = await parseRequest(req);

    const { isValid, errors } = validateParams(parsed.body, rules);

    if (!isValid) {
      //   console.error("Validation failed:", errors);
      res.end(JSON.stringify({ statusCode: 203, message: errors }));
    }

    const isAdded = await Employee.create(parsed.body);
    if (isAdded) {
      res.end(
        JSON.stringify({
          statusCode: 200,
          message: "Employee detail added successfully",
        })
      );
    } else {
      res.end(
        JSON.stringify({
          statusCode: 203,
          message: "Employee detail not added!",
        })
      );
    }
  } catch (error) {
    res.end(JSON.stringify({ statusCode: 400, message: error.message }));
  }
};

export const updateEmployee = async (req, res, id) => {
  try {
    const parsed = await parseRequest(req);

    const { isValid, errors } = validateParams(parsed.body, rules);
    if (!isValid) {
      //   console.error("Validation failed:", errors);
      res.end(JSON.stringify({ statusCode: 203, message: errors }));
    }
    const isUpdated = await Employee.update(id, parsed.body);
    if (isUpdated) {
      res.end(
        JSON.stringify({
          statusCode: 200,
          message: "Employee detail updated successfully",
        })
      );
    } else {
      res.end(
        JSON.stringify({
          statusCode: 203,
          message: "Employee detail not updated!",
        })
      );
    }
  } catch (error) {
    res.end(JSON.stringify({ statusCode: 400, message: error.message }));
  }
};

export const deleteEmployee = async (req, res, id) => {
  // console.log(id,'from controller');
  const isDeleted = await Employee.delete(id);
  if (isDeleted) {
    res.end(
      JSON.stringify({
        statusCode: 200,
        message: "Employee detail deleted successfully",
      })
    );
  } else {
    res.end(
      JSON.stringify({
        statusCode: 203,
        message: "Employee detail not deleted!",
      })
    );
  }
};
