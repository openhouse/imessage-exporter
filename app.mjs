// app.mjs

/**
 * Entry point for the iMessage Exporter application.
 * Sets up the Express server, view engine, middleware, and routes.
 * This file initializes the application and starts the server.
 */

import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import sassMiddleware from "sass-middleware";
import indexRouter from "./routes/index-route.mjs";
import conversationRouter from "./routes/conversation-route.mjs";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register helper functions for Handlebars
const hbs = engine({
  extname: ".hbs",
  helpers: {
    /**
     * Helper to check if a string contains a substring.
     * @param {string} str - The string to search.
     * @param {string} substring - The substring to look for.
     * @returns {boolean} - True if substring is found in str.
     */
    contains: function (str, substring) {
      return str && str.includes(substring);
    },
    /**
     * Helper to encode a URI component.
     * @param {string} component - The component to encode.
     * @returns {string} - The encoded component.
     */
    encodeURIComponent: function (component) {
      return encodeURIComponent(component);
    },
    /**
     * Helper to decode a URI component.
     * @param {string} component - The component to decode.
     * @returns {string} - The decoded component.
     */
    decodeURIComponent: function (component) {
      return decodeURIComponent(component);
    },
  },
});

const app = express();

// Set up Handlebars view engine
app.engine("hbs", hbs);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Set up SCSS middleware to compile SCSS files on-the-fly
app.use(
  sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public/css"),
    indentedSyntax: false, // true = .sass and false = .scss
    debug: true,
    outputStyle: "compressed",
    prefix: "/css",
  })
);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", indexRouter);
app.use("/conversation", conversationRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
