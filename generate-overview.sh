#!/bin/bash

# generate-overview.sh

# Generates a project overview including a heading section, directory structure, and file contents.
# Outputs to 'project-overview.md'.

# Define the heading content
heading="# Project Overview: iMessage Exporter

This project is a Node.js application that allows users to view and export their iMessage conversations from a local 'chat.db' database. It provides a web interface to browse conversations, view messages, and access attachments like images and videos. The application is designed with a focus on clarity, modularity, and ease of collaboration, following conventions inspired by Ember.js.

---

## Project Structure
"

# Output the heading to project-overview.md
echo "$heading" > project-overview.md

# Generate directory tree, excluding certain directories, and append to project-overview.md
tree -I "node_modules|.git|data|public" >> project-overview.md

# Append a separator
echo -e "\n---\n" >> project-overview.md

# Append the contents of key files to project-overview.md
echo "## Contents of JavaScript, MJS, SCSS, Handlebars, JSON, and Config files:" >> project-overview.md

# Find and display contents of specific file types, appending to project-overview.md
find . -type f \
  \( -name "*.js" -o -name "*.mjs" -o -name "*.scss" -o -name "*.hbs" -o -name "*.json" -o -name "*.config.js" -o -name "*.md" \) \
  ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./data/*" ! -path "./public/*" ! -name ".env" \
  ! -name "project-overview.md" \
  -exec sh -c '
    for filepath do
      {
        echo ""
        echo "### **$filepath**"
        echo ""
        echo "\`\`\`"
        cat "$filepath"
        echo ""
        echo "\`\`\`"
      } >> project-overview.md
    done
  ' sh {} +
