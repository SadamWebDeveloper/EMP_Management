import { getDBConnection } from "../config/database.js";

const Employee = {
  // Get all employees
  getAll: async (start = 0, limit = 10) => {
    try {
      const db = await getDBConnection();

      // Query to fetch the paginated employees
      const [rows] = await db.query(
        "SELECT * FROM employees LIMIT ? OFFSET ?",
        [limit, start]
      );

      // Query to get the total count of employees
      const [totalCountResult] = await db.query(
        "SELECT COUNT(*) AS total FROM employees"
      );
      const totalCount = totalCountResult[0].total;

      return {
        employees: rows,
        totalCount: totalCount,
      };
    } catch (error) {
      console.error(
        `Error fetching employees with pagination: ${error.message}`
      );
      throw error;
    }
  },

  // Get an employee by ID
  get: async (id) => {
    try {
      const db = await getDBConnection();
      const [rows] = await db.query(
        "SELECT * FROM employees WHERE id = ?",
        [id]
      );
      return rows[0] || null; // Return the employee or null if not found
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}: ${error.message}`);
      return null;
    }
  },

  // Create a new employee
  create: async (employeeData) => {
    const { name, age, position, department } = employeeData;
    try {
      const db = await getDBConnection();
      const [result] = await db.query(
        "INSERT INTO employees (name, age, position, department) VALUES (?, ?, ?, ?)",
        [name, age, position, department]
      );
      return { id: result.insertId, ...employeeData }; // Return the created employee with the new ID
    } catch (error) {
      console.error(`Error creating employee: ${error.message}`);
      return false;
    }
  },

  // Update an employee by ID
  update: async (id, employeeData) => {
    const { name, age, position, department } = employeeData;
    try {
      const db = await getDBConnection();
      const [result] = await db.query(
        "UPDATE employees SET name = ?, age = ?, position = ?, department = ? WHERE id = ?",
        [name, age, position, department, id]
      );
      return result.affectedRows > 0; // Return true if the update was successful
    } catch (error) {
      console.error(`Error updating employee with ID ${id}: ${error.message}`);
      return false;
    }
  },

  // Delete an employee by ID
  delete: async (id) => {
    try {
      const db = await getDBConnection();
      const [result] = await db.query(
        "DELETE FROM employees WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0; // Return true if the delete was successful
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}: ${error.message}`);
      return false;
    }
  },
};

export default Employee;
