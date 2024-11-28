import employeeRoutes from "./routes/employeesRoute.js";

const app = (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (can be restricted)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const routeHandled = employeeRoutes(req, res);
  if (!routeHandled) {
    res.end(JSON.stringify({ statusCode: 404, message: "Not Found" }));
  }
};

export default app;
