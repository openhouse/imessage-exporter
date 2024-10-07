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
