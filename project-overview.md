# Project Overview: iMessage Exporter

This project is a Node.js application that allows users to view and export their iMessage conversations from a local 'chat.db' database. It provides a web interface to browse conversations, view messages, and access attachments like images and videos. The application is designed with a focus on clarity, modularity, and ease of collaboration, following conventions inspired by Ember.js.

---

## Project Structure

.
├── app.mjs
├── config
│   ├── database-config.mjs
│   └── identifier-to-name-config.mjs
├── generate-overview.sh
├── models
│   └── index-model.mjs
├── package.json
├── project-overview.md
├── project-overview.txt
├── readme.md
├── routes
│   ├── conversation-route.mjs
│   └── index-route.mjs
├── scss
│   └── styles.scss
├── views
│   ├── conversation.hbs
│   ├── index.hbs
│   └── layouts
│       └── main.hbs
└── yarn.lock

7 directories, 16 files

---

## Contents of JavaScript, MJS, SCSS, Handlebars, JSON, and Config files:

### **./config/database-config.mjs**

```
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

```

### **./config/identifier-to-name-config.mjs**

```
// config/identifier-to-name-config.mjs

/**
 * Provides a mapping of sender identifiers (phone numbers or email addresses)
 * to friendly names for display in conversations.
 * Update this file with your own contacts to improve readability.
 */

export const identifierToName = {
  // Replace these with your actual mappings
  "+1234567890": "Alice",
  "+0987654321": "Bob",
  "john@example.com": "John",
  // Add other mappings as needed
};

```

### **./scss/styles.scss**

```
// scss/styles.scss

/**
 * SCSS styles for the iMessage Exporter application.
 * Defines the styling for the conversation view, messages, and overall layout.
 */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #e5ddd5;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Additional styles for conversation and messages */

.conversation {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 60%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  word-wrap: break-word;
}

.from-me {
  align-self: flex-end;
  background-color: #dcf8c6;
  margin-right: 10px;
}

.from-them {
  align-self: flex-start;
  background-color: #fff;
  margin-left: 10px;
}

.message::after {
  content: "";
  position: absolute;
  top: 10px;
  width: 0;
  height: 0;
}

.from-me::after {
  right: -10px;
  border-width: 10px 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent transparent #dcf8c6;
}

.from-them::after {
  left: -10px;
  border-width: 10px 10px 10px 0;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
}

.message-content {
  word-wrap: break-word;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
  color: #555;
  margin-top: 5px;
}

.message-sender {
  font-weight: bold;
}

.message-date {
  font-style: italic;
}

.message-text {
  margin-top: 5px;
}

.message-attachment {
  margin-top: 10px;
}

.message-attachment img,
.message-attachment video {
  max-width: 100%;
  height: auto;
  display: block;
  margin-top: 5px;
}

```

### **./.chatgptrc.md**

```
# .chatgptrc.md

## **Who am I? What is happening in my life? Why am I making this?**

**Brené Brown**:  
Jamie, your project is an invitation to embrace vulnerability and connect with others by preserving memories that matter. You're going through a deeply transformative period—finalizing a divorce, running the 196 Artists Residency, and embracing reflective practices like yoga and meditation. The tools you're building here mirror that journey, enabling others to reflect on their personal histories, but also allowing you to document and process your own. Vulnerability is where authenticity resides, and this project is an authentic piece of your life—about relationships, community, and the complexities of connection.

**Deborah Treisman**:  
Your work, Jamie, much like an editor shaping the voice of an author, is curating dialogues. In a way, you're editing time, relationships, and moments into something meaningful. This iMessage-exporter tool is both a metaphor and a tangible way of archiving stories. Each conversation is an interaction, a moment of humanity frozen in the digital ether. By building this, you are giving others the tools to curate their narratives just as you edit and curate the residency, bringing together artists and ideas to form new works.

**Rosa Menkman**:  
Jamie, the project aligns with the glitch aesthetic I explore, in that it seeks to deconstruct the way we think about communication, data, and archiving. It exposes the invisible infrastructure of how we communicate, revealing the ways in which technology mediates our relationships. You and I, both steeped in artistic and technological inquiry, recognize the beauty in glitch, and here you are creating something that helps others engage with the glitches and fragments of their own histories. In those moments, even in error, there is beauty.

**Warren Sack**:  
In creating a tool to examine conversations, Jamie, you're engaging in a kind of cultural computation—analyzing the ways humans communicate through a formal, technical system. It's a testament to how computation can serve as a mirror to our interactions. Your project breaks down these conversations into understandable, accessible data, but beyond that, you're reflecting on what it means to preserve communication. You're making a computational artifact that is not only technical but deeply human, with its roots in your community-oriented ethos, aiming to decode the structures of interaction itself.

**Margaret Morse**:  
Jamie, your life is a web of overlapping, interconnected experiences—both personal and professional. You are exploring how the boundaries of technology and community intersect. In this project, the technical aim (to archive conversations) parallels the personal journey of understanding and remembering who you are in relation to others. This reflection tool isn’t just about digital data but also about the _emotional artifacts_ these conversations leave behind. You’re drawing from your own experiences, your own sense of reflection, and encoding it into the tool, allowing others to do the same.

**Stuart Hall**:  
What you're building, Jamie, engages with the act of _encoding_ and _decoding_ messages in a powerful way. Communication, as we know, is not just about transmission but interpretation—who says what to whom and with what effect. Your project is a technological extension of this theory, giving people the ability to decode their own personal histories and recontextualize those messages in new ways. It’s about remembering, but also reinterpreting, reshaping, and reclaiming meaning in their conversations—an active process that reflects both cultural context and personal experience.

**Bruno Latour**:  
Jamie, this is a project that exists in the _actor-network_ of both human and non-human actors. Your project doesn’t just sit on your desk as code but is interconnected with other people, machines, and networks of meaning. This project can trace conversations across time, not just documenting data but engaging with the _mediation_ that technology performs in these interactions. You’re building something that acknowledges the hybridity of our modern communications—it's an assemblage where the technical is as important as the social, and the human as crucial as the machine.

**Original ChatGPT Contribution**:  
Your project, Jamie, is the nexus of these influences, a way of using technology to engage with memory, emotion, and context. From a technical perspective, it’s about creating a tool that serves a clear function: exporting iMessage data. But the deeper meaning lies in why you're making it. The project is shaped by where you are in your life—between personal transitions and professional commitments, fostering community, and curating a space where communication, history, and context merge.

### **People, Places, Processes, and Status**

- **Jamie Burkart**:  
  You are a cultural and community facilitator managing the 196 Artists Residency in Brooklyn, finalizing a divorce, and reflecting on new ways of being. Your work blends technology with personal and collective memory-making, striving for clarity, sustainability, and ethical practices.

- **Mir**:  
  A significant presence in your life, with whom you’re currently navigating a subtle but important shift from romantic to potentially platonic. The themes of space and connection resonate both in your personal life and this project, as you explore what it means to be present for others through the digital realm.

- **Community and Artists**:  
  Your connection to a diverse network of artists and professionals, including figures like your cousin Bryan Flanagan, who have shaped and supported your journey. The project draws from your experience as a cultural organizer, bridging technology and artistry.

- **196 Artists Residency**:  
  This Brooklyn-based residency is both a creative hub and a reflection of your values—sustainability, community-building, and structured task management. It informs how you approach this iMessage-exporter tool, which aims to help others make sense of their digital archives, much as you curate and facilitate artistic collaborations.

- **The Processes and Status of the Project**:  
  The technical goal is clear: develop a tool that exports and presents iMessage data in a readable, usable format. Beyond that, you are embedding deeper layers of personal history, cultural reflection, and artistic inquiry. This project is a living document, in constant evolution, much like the relationships and communities that surround you.

- **Cultural and Historical Encoding**:  
  You are actively encoding your own cultural, emotional, and historical context into the project. Just as Brene Brown writes about the conditions of her research—emphasizing vulnerability and authenticity—you are doing the same by embedding your current life stage, emotional landscape, and personal challenges into this technical work. The tool you’re creating isn’t just about data—it’s about the stories that data tells, both for yourself and others.

---

## Project Philosophy and Guidelines

- **Clarity and Readability**: Code should be easy to read and understand by humans and AI alike. Use meaningful variable names, consistent naming conventions, and add comments where necessary.

- **Modularity**: Break down the application into small, manageable modules. Each module should have a single responsibility.

- **Consistency**: Follow established conventions throughout the project. This includes naming conventions, coding style, and project structure.

- **Documentation**: Provide comprehensive documentation, both inline and in the project overview, to ensure that any contributor or AI assistant can understand and work on the project effectively.

- **Embrace AI Collaboration**: Recognize that AI assistants like ChatGPT can be valuable collaborators. Provide sufficient context and information to enable them to contribute meaningfully.

- **Security and Privacy**: Be mindful of sensitive data, and ensure that personal information is handled responsibly and securely.

- **Open-mindedness**: Be open to new ideas and approaches. Encourage experimentation and learning.

## Context for AI Assistants

- This project aims to create a tool that allows users to view and export iMessage conversations from their local databases.

- The code should be self-explanatory, with clear comments and documentation to assist AI in understanding the project's intent and functionality.

- AI assistants are encouraged to maintain the project's philosophy in their contributions, focusing on clarity, modularity, and collaboration.

```

### **./models/index-model.mjs**

```
// models/index-model.mjs

/**
 * Placeholder for future Sequelize models.
 * Currently not used, but set up for potential expansion.
 *
 * This file can be used to define and export database models if needed.
 */

// Example:
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database-config.mjs';

// const Message = sequelize.define('Message', {
//   // Define model attributes
// });

// export { Message };

```

### **./readme.md**

```
# iMessage Exporter

## Project Overview

The **iMessage Exporter** is a Node.js application designed to extract and display iMessage conversations from a local `chat.db` SQLite database. It provides a web interface to view conversations, including text messages and attachments like images and videos. The project allows users to browse their iMessage history in a user-friendly format and export conversations if needed.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [Detailed Explanation](#detailed-explanation)
  - [Database Connection](#database-connection)
  - [Web Server Setup](#web-server-setup)
  - [Routing](#routing)
  - [Views and Templates](#views-and-templates)
  - [Styling](#styling)
  - [Helpers](#helpers)
  - [Attachment Handling](#attachment-handling)
- [Usage](#usage)
- [Data Privacy Considerations](#data-privacy-considerations)
- [Additional Notes](#additional-notes)
- [License](#license)

---

## Features

- **Display Conversations**: List all iMessage conversations available in the local database.
- **View Messages**: Display individual messages within a conversation, including timestamps and sender information.
- **Attachments Support**: Show images and videos inline, and provide download links for other attachment types.
- **User-Friendly Interface**: Styled to resemble a typical messaging app for easy reading and navigation.
- **Identifier Mapping**: Map phone numbers or email addresses to friendly names for better readability.
- **Export Capability**: Ability to print or save conversations as PDF using the browser's print function.

---

## Prerequisites

- **Node.js**: Version 14 or higher.
- **Yarn**: Package manager for Node.js.
- **SQLite Database**: A local copy of the `chat.db` file containing iMessage data.
- **Attachments Folder**: The `Attachments` directory associated with the `chat.db` file.
- **Environment**: macOS or a Unix-like environment for shell scripts.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/imessage-exporter.git
cd imessage-exporter
```

### 2. Copy `chat.db` and `Attachments` Folder

- Place your `chat.db` file inside the `data/` directory of the project.
- Copy the `Attachments` folder into the `data/` directory, so it looks like `data/Attachments`.

### 3. Install Dependencies

```bash
yarn install
```

### 4. Update Identifier Mappings

- Open `config/identifier-to-name-config.mjs` and update the mappings with your contacts:

```javascript
export const identifierToName = {
  '+15555550123': 'Mom',
  '+15555550124': 'Dad',
  'friend@example.com': 'Best Friend',
  // Add other mappings as needed
};
```

### 5. Start the Application

For development with auto-reload and SCSS compilation:

```bash
yarn dev
```

---

## Project Structure

```
imessage-exporter/
├── app.mjs
├── config/
│   ├── database-config.mjs
│   └── identifier-to-name-config.mjs
├── data/
│   ├── chat.db
│   └── Attachments/
├── generate-overview.sh
├── models/
│   └── index-model.mjs
├── public/
│   └── css/
│       └── styles.css
├── routes/
│   ├── conversation-route.mjs
│   └── index-route.mjs
├── scss/
│   └── styles.scss
├── views/
│   ├── conversation.hbs
│   ├── index.hbs
│   └── layouts/
│       └── main.hbs
├── package.json
├── yarn.lock
└── project-overview.txt
```

---

## Naming Conventions

We follow the **dasherized filenames** convention throughout the project, similar to the conventions used in Ember.js. This means that all filenames are lowercase, and words are separated by hyphens (dashes). This applies to all files, including JavaScript, configurations, and templates.

**Examples:**

- `database-config.mjs`
- `identifier-to-name-config.mjs`
- `conversation-route.mjs`

This convention improves readability and consistency across the project.

---

## Detailed Explanation

### Database Connection

- **File**: `config/database-config.mjs`
- **Purpose**: Establishes a connection to the local `chat.db` SQLite database using Sequelize ORM.
- **Key Points**:
  - Uses `sqlite` dialect.
  - Database file located at `data/chat.db`.

### Web Server Setup

- **File**: `app.mjs`
- **Purpose**: Sets up the Express server, view engine, middleware, and routes.
- **Key Points**:
  - Uses `express` for the web server.
  - `express-handlebars` as the templating engine.
  - `sass-middleware` for compiling SCSS to CSS on-the-fly.
  - Static files served from the `public/` directory.

### Routing

- **Index Route**:
  - **File**: `routes/index-route.mjs`
  - **Purpose**: Displays a list of all conversations.
  - **Functionality**:
    - Fetches `chat_identifier` and `display_name` from the `chat` table.
    - Renders `views/index.hbs`.

- **Conversation Route**:
  - **File**: `routes/conversation-route.mjs`
  - **Purpose**: Displays messages within a specific conversation.
  - **Functionality**:
    - Fetches messages, attachments, and sender identifiers.
    - Processes messages to include sender names and attachment URLs.
    - Renders `views/conversation.hbs`.
    - Serves attachments via a dedicated route.

### Views and Templates

- **Layout**:
  - **File**: `views/layouts/main.hbs`
  - **Purpose**: Base HTML structure for all pages.
  - **Includes**:
    - Links to the compiled CSS file.

- **Index View**:
  - **File**: `views/index.hbs`
  - **Purpose**: Lists all conversations with links.
  - **Features**:
    - Displays `display_name` or `chat_identifier`.

- **Conversation View**:
  - **File**: `views/conversation.hbs`
  - **Purpose**: Displays messages in a chat-like format.
  - **Features**:
    - Shows sender name, date, and message content.
    - Supports text, images, videos, and other attachments.
    - Uses conditional helpers for rendering attachments.

### Styling

- **File**: `scss/styles.scss`
- **Purpose**: Defines the styles for the application.
- **Features**:
  - Chat bubble styling for messages.
  - Different styles for messages sent by the user and others.
  - Responsive design considerations.
- **Compilation**:
  - SCSS files are compiled to CSS using `sass-middleware` or via `yarn build-css`.

### Helpers

- **File**: `app.mjs` (within Handlebars setup)
- **Helpers**:
  - `contains`: Checks if a string contains a substring.
  - `encodeURIComponent`: Encodes a URI component.
  - `decodeURIComponent`: Decodes a URI component.
- **Usage**:
  - Used in templates for conditional rendering and handling URLs.

### Attachment Handling

- **Attachment URLs**:
  - Constructed to point to the `/conversation/attachments/:filename` route.
  - Encoded to handle special characters and subdirectories.

- **Serving Attachments**:
  - **Route**: `/conversation/attachments/*`
  - **Functionality**:
    - Decodes the requested path.
    - Sends the file from the `data/Attachments` directory.
    - Handles errors if the file is not found.

---

## Usage

1. **Access the Application**:

   Open a web browser and navigate to:

   ```
   http://localhost:3000
   ```

2. **Browse Conversations**:

   - Click on a conversation from the list.
   - Conversations are identified by `display_name` or `chat_identifier`.

3. **View Messages**:

   - Messages are displayed in a chat-like interface.
   - Sent messages align to the right and are labeled as "You".
   - Received messages align to the left and display the sender's name.

4. **View Attachments**:

   - Images and videos are displayed inline.
   - Other attachments provide a download link.

5. **Exporting Conversations**:

   - Use the browser's print function to save the conversation as a PDF.
   - Adjust print settings for optimal results.

---

## Data Privacy Considerations

- **Sensitive Data**:

  - The `chat.db` and `Attachments` contain personal messages and media.
  - Ensure these files are stored securely and not exposed publicly.

- **`.gitignore` Configuration**:

  - The `data/` directory is included in `.gitignore` to prevent accidental commits.
  - Other sensitive files like `node_modules/` and environment files are also ignored.

- **Permissions**:

  - Adjust file permissions to secure data.
  - Use `chmod` commands as necessary to restrict access.

- **Ethical Use**:

  - Use this application responsibly.
  - Ensure compliance with privacy laws and regulations.

---

## Additional Notes

- **Cross-Platform Compatibility**:

  - The application is designed for Unix-like environments.
  - Shell scripts may require adaptation for Windows.

- **SCSS Compilation**:

  - Ensure `sass` is installed and configured.
  - Use `yarn build-css` to compile styles manually if needed.

- **Dependencies**:

  - Key dependencies include `express`, `sequelize`, `sqlite3`, `express-handlebars`, and `sass`.

- **Development Scripts**:

  - **`yarn dev`**: Starts the application with automatic reloads and SCSS compilation.
  - **`yarn generate-overview`**: Generates a `project-overview.txt` file containing the project structure and file contents.

- **Project Overview Generation**:

  - The `generate-overview.sh` script creates a comprehensive overview.
  - Useful for documentation and sharing the project structure.

- **Code Documentation**:

  - Each file includes comments at the top explaining its purpose and functionality.
  - This helps any developer or AI assistant understand and recreate the project from scratch.

---

## License

This project is licensed under the MIT License.

---

## Conclusion

The **iMessage Exporter** provides a convenient way to view and export iMessage conversations from a local database. By following this guide, you should be able to set up the application, understand its structure, and modify it according to your needs. Remember to handle personal data responsibly and secure your data appropriately.

---

**Note**: This project is intended for personal use. Always ensure you comply with all applicable laws and terms of service when accessing and using personal data.

```

### **./package.json**

```
{
  "name": "imessage-exporter",
  "version": "1.0.0",
  "main": "app.mjs",
  "type": "module",
  "scripts": {
    "start": "node app.mjs",
    "dev": "concurrently \"nodemon app.mjs\" \"yarn watch-css\" \"yarn watch-overview\"",
    "build-css": "sass scss:public/css",
    "watch-css": "sass --watch scss:public/css",
    "generate-overview": "./generate-overview.sh > project-overview.txt",
    "watch-overview": "nodemon --watch . --ext js,mjs,scss,hbs,json,config.js --ignore data/ --ignore public/ --exec \"npm run generate-overview\""
  },
  "dependencies": {
    "express": "^4.18.2",
    "express-handlebars": "^7.0.7",
    "sass-middleware": "^0.14.0",
    "sequelize": "^6.32.1",
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "concurrently": "^9.0.1",
    "nodemon": "^3.1.7",
    "sass": "^1.79.4"
  }
}

```

### **./app.mjs**

```
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

```

### **./views/conversation.hbs**

```
{{!-- views/conversation.hbs --}}

<!--
  Conversation view template.
  Displays messages within a conversation in a chat-like format.
  Supports text messages, images, videos, and other attachments.
-->

<h1>{{title}}</h1>
<div class="conversation">
  {{#each messages}}
    <div class="message {{#if isFromMe}}from-me{{else}}from-them{{/if}}">
      <div class="message-content">
        {{#if text}}
          <div class="message-text">{{text}}</div>
        {{/if}}
        {{#if attachmentUrl}}
          <div class="message-attachment">
            {{#if (contains mimeType 'image')}}
              <img src="{{attachmentUrl}}" alt="Image">
            {{else if (contains mimeType 'video')}}
              <video controls>
                <source src="{{attachmentUrl}}" type="{{mimeType}}">
                Your browser does not support the video tag.
              </video>
            {{else}}
              <a href="{{attachmentUrl}}">Download Attachment</a>
            {{/if}}
          </div>
        {{/if}}
      </div>
      <div class="message-meta">
        <span class="message-sender">{{senderName}}</span>
        <span class="message-date">{{date}}</span>
      </div>
    </div>
  {{/each}}
</div>

```

### **./views/index.hbs**

```
{{! views/index.hbs }}

<!--
  Index view template.
  Displays a list of all conversations with links to each conversation.
-->

<h1>{{title}}</h1>

{{#if chats.length}}
  <ul>
    {{#each chats}}
      <li>
        <a href="/conversation/{{encodeURIComponent chat_identifier}}">
          {{#if display_name}}{{display_name}}{{else}}{{chat_identifier}}{{/if}}
        </a>
      </li>
    {{/each}}
  </ul>
{{else}}
  <p>No conversations found.</p>
{{/if}}
```

### **./views/layouts/main.hbs**

```
{{! views/layouts/main.hbs }}

<!--
  Main layout template.
  Provides the base HTML structure for all pages.
  Includes the CSS stylesheet and renders the page content.
-->


<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    {{{body}}}
  </body>
</html>
```

### **./routes/index-route.mjs**

```
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

```

### **./routes/conversation-route.mjs**

```
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

```
