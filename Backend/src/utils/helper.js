import dotenv from "dotenv";
dotenv.config();

export const getConfig = () => {
  return {
    port: process.env.PORT,
    host: process.env.HOST,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
  };
};

export const parseRequest = (req) => {
  return new Promise((resolve, reject) => {
    const url = new URL(`http://${req.headers.host}`);

    const queryParams = Object.fromEntries(url.searchParams);
    const segments = url.pathname.split("/");

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedBody = body ? JSON.parse(body) : null;
        resolve({ queryParams, segments, body: parsedBody });
      } catch (error) {
        reject(error);
      }
    });
  });
};
