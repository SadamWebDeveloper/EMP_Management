import mysql from "mysql2/promise";
import { getConfig } from "../utils/helper.js";

const config = getConfig();

export const getDBConnection = async () => {
  try {
    const db = await mysql.createConnection({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
    });
    console.log("Connected to the database:", config.dbName);
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};
