// routes/conversation-route.mjs

/**
 * Defines the route for displaying messages within a specific conversation.
 * Handles fetching messages, attachments, and sender information from the database.
 * Processes messages for rendering and serves attachments.
 */

import express from "express";
import path from "path";
import fs from "fs";
import sequelize from "../config/database-config.mjs";
import { fileURLToPath } from "url";
import { identifierToName } from "../config/identifier-to-name-config.mjs"; // Import the identifier-to-name mapping

const router = express.Router();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to resolve attachment paths
const getAttachmentPath = (relativePath) => {
  const attachmentsDir = path.resolve(__dirname, "../data/Attachments");
  const decodedPath = relativePath
    .split("/")
    .map(decodeURIComponent)
    .join(path.sep);
  return path.join(attachmentsDir, decodedPath);
};

router.get("/:chatId", async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const [messages] = await sequelize.query(
      `
      SELECT
        message.ROWID,
        message.text,
        message.is_from_me,
        datetime(message.date / 1000000000 + strftime('%s', '2001-01-01'), 'unixepoch', 'localtime') AS date,
        attachment.filename,
        attachment.mime_type,
        handle.id AS sender_identifier
      FROM
        message
      LEFT JOIN
        message_attachment_join ON message.ROWID = message_attachment_join.message_id
      LEFT JOIN
        attachment ON attachment.ROWID = message_attachment_join.attachment_id
      LEFT JOIN
        handle ON message.handle_id = handle.ROWID
      JOIN
        chat_message_join ON message.ROWID = chat_message_join.message_id
      WHERE
        chat_message_join.chat_id = (
          SELECT
            ROWID
          FROM
            chat
          WHERE
            chat_identifier = ?
        )
      ORDER BY
        message.date ASC
      `,
      { replacements: [chatId] }
    );

    // Process messages to prepare for rendering
    const processedMessages = messages.map((msg) => {
      let attachmentUrl = null;
      if (msg.filename) {
        // Original path of the attachment
        const originalAttachmentPath = msg.filename;

        // Remove 'file://' prefix if present
        const filePath = originalAttachmentPath.replace("file://", "");

        // Get the relative path after 'Attachments/' directory
        const pathParts = filePath.split("Attachments/");
        const attachmentRelativePath = pathParts[1];

        if (attachmentRelativePath) {
          // Build the new path in our project's data/Attachments directory
          const encodedRelativePath = attachmentRelativePath
            .split(path.sep)
            .map(encodeURIComponent)
            .join("/");

          attachmentUrl = `/conversation/attachments/${encodedRelativePath}`;
        } else {
          console.warn(
            `Could not parse attachment path: ${originalAttachmentPath}`
          );
        }
      }

      // Determine sender name
      let senderName;
      if (msg.is_from_me === 1) {
        senderName = "You"; // Or your own name
      } else {
        senderName =
          identifierToName[msg.sender_identifier] ||
          msg.sender_identifier ||
          "Unknown";
      }

      return {
        text: msg.text,
        isFromMe: msg.is_from_me === 1,
        date: msg.date,
        attachmentUrl,
        mimeType: msg.mime_type,
        senderName,
      };
    });

    res.render("conversation", {
      chatId,
      messages: processedMessages,
      title: `Conversation with ${chatId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Serve attachments
router.get("/attachments/*", (req, res) => {
  const relativePath = req.params[0]; // Capture the wildcard path
  const attachmentPath = getAttachmentPath(relativePath);

  res.sendFile(attachmentPath, (err) => {
    if (err) {
      console.error("Error sending attachment:", err);
      res.status(404).send("Attachment not found");
    }
  });
});

export default router;
