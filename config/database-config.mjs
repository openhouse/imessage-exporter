// config/database-config.mjs

/**
 * Configures the connection to the local 'chat.db' SQLite database using Sequelize ORM.
 * This module exports a Sequelize instance connected to the 'chat.db' file.
 */

import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the local chat.db file
const databasePath = path.resolve(__dirname, "../data/chat.db");

// Initialize Sequelize with SQLite dialect
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: false, // Disable logging; change to console.log for debugging
});

export default sequelize;
