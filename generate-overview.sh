#!/bin/bash

# generate-overview.sh

# Generates a project overview including directory structure and file contents.
# Outputs to 'project-overview.txt'.

# Generate directory tree, excluding certain directories
tree -I "node_modules|.git|data|public"

printf "\n\nContents of JavaScript, MJS, SCSS, Handlebars, JSON, and Config files:\n\n"

# Find and display contents of specific file types
find . -type f \
  \( -name "*.js" -o -name "*.mjs" -o -name "*.scss" -o -name "*.hbs" -o -name "*.json" -o -name "*.config.js" \) \
  ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./data/*" ! -path "./public/*" ! -name ".env" \
  -exec sh -c '
    for filepath do
      echo "##### $filepath #####"
      cat "$filepath"
      echo ""
    done
  ' sh {} +
