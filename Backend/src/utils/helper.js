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

// request parsing helper function

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


// below wrote function is validation helper function 

export const validateParams = (params, rules) => {
  const errors = {};
  const validatedParams = {};

  Object.keys(rules).forEach((key) => {
    const rule = rules[key];
    const value = params[key];

    // required field validation
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors[key] = `${key} is required.`;
      return;
    }


    if (!rule.required && (value === undefined || value === null || value === '')) {
      return;
    }


    if (rule.type && typeof value !== rule.type) {
      errors[key] = `${key} must be of type ${rule.type}.`;
      return;
    }


    validatedParams[key] = value;
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    validatedParams,
  };
};


