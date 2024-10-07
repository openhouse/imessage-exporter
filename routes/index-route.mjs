// routes/index-route.mjs

/**
 * Defines the route for the index page, displaying a list of all conversations.
 * Fetches conversation identifiers and display names from the database.
 */

import express from "express";
import sequelize from "../config/database-config.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT
        chat_identifier,
        display_name
      FROM
        chat
      ORDER BY
        display_name ASC
    `);

    res.render("index", { chats: results, title: "Conversations" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
