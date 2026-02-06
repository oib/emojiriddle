#!/bin/bash

echo "Setting up GitHub repository for EmojiRiddle..."

# Add all files
git add .

# Commit changes
git commit -m "Fix layout flash and optimize for production

- Moved all CSS inline to eliminate flash of unstyled content
- Removed Google Fonts dependency for faster loading
- Using system fonts (Comic Sans MS, Chalkboard SE)
- All styles now load instantly with no external dependencies
- Game fits perfectly within display (max-width: 960px)
- Fully translated to English
- Ready for production deployment!"

# Push to new GitHub repository
git push -u origin main

echo "Successfully pushed to GitHub! 🚀"
echo "Repository: https://github.com/oib/emojiriddle.git"
