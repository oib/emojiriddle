# EmojiRiddle 🧠

A fun and interactive emoji-based math puzzle game built with FastAPI backend and vanilla JavaScript frontend.

## 🎮 Game Overview

EmojiRiddle is a mathematical puzzle game where players solve equations using emojis as variables. The game presents simple addition equations where emojis represent unknown numbers, and players must figure out the correct value for each emoji.

### How to Play
1. Two random emojis are selected (e.g., 🐶 and 🐱)
2. Each emoji is assigned a random value between 1 and 9
3. The game shows equations using these emojis (e.g., 🐶 + 🐶 = 8, 🐶 + 🐱 = 12)
4. Players must deduce the value of each emoji and input their answers
5. Correct answers trigger a celebration and a new round starts automatically

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Uvicorn server
- **Language**: Python 3.11+
- **API Endpoints**:
  - `GET /` - Serves the main HTML page
  - `GET /api/riddle` - Generates a new riddle with random emojis and values
  - `POST /api/check` - Validates player's guess

### Frontend (Vanilla JavaScript)
- **No frameworks** - Pure HTML, CSS, and JavaScript
- **Structure**:
  - `index.html` - Main game page
  - `app.js` - Core game logic and UI management
  - `button.js` - Utility functions for UI components
  - `routes.js` - Route definitions (currently unused)
  - `style.css` - Game styling with animations

## 📁 Project Structure

```
emojiriddle/
├── main.py              # FastAPI backend application
├── requirements.txt     # Python dependencies
├── static/              # Frontend assets
│   ├── index.html      # Main game page
│   ├── app.js          # Core game logic
│   ├── button.js       # UI utilities
│   ├── routes.js       # Route definitions
│   └── style.css       # Styling and animations
├── docs/               # Documentation
│   └── README.md       # This file
├── .gitignore          # Git ignore rules
└── venv/              # Python virtual environment
```

## 🚀 Getting Started

### Prerequisites
- Python 3.11 or higher
- pip package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd emojiriddle
   ```

2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   uvicorn main:app --reload
   ```

5. **Open your browser**:
   Navigate to `http://localhost:8009` to start playing!

## 🎯 Game Features

- **Dynamic Riddles**: Each round generates new random puzzles
- **Visual Feedback**: Instant feedback with animations for correct/incorrect answers
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-restart**: New round starts automatically after correct answer
- **Shake Animation**: Visual feedback for incorrect attempts

## 🔧 API Details

### GET /api/riddle
Returns a new riddle with equations and available emojis.

**Response Example**:
```json
{
  "equations": [
    {"left": ["🐶", "🐶"], "op": "+", "right": 8},
    {"left": ["🐶", "🐱"], "op": "+", "right": 12}
  ],
  "emojis": ["🐶", "🐱"]
}
```

### POST /api/check
Validates the player's guess.

**Request Body**:
```json
{
  "guess": {"🐶": 4, "🐱": 8}
}
```

**Response**:
```json
{"result": "✅ Correct!"}
```
or
```json
{"result": "❌ Incorrect!"}
```

## 🎨 Styling & Animations

The game features:
- Clean, centered layout with maximum width of 960px
- Large, readable emoji displays (1.5rem font size)
- Smooth fade-in transitions for feedback messages
- Shake animation for incorrect answers
- Hover effects on interactive elements

## 🔄 Game Flow

1. Page loads → Fetches new riddle from API
2. Displays equations and input fields
3. Player submits guess → API validates answer
4. Shows feedback with animation
5. If correct: Celebrates and reloads after 3 seconds
6. If incorrect: Shakes feedback, keeps game state for retry

## 🚀 Deployment

The application is ready for deployment on any platform that supports Python web applications:

### Docker Deployment
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Cloud Platforms
- **Heroku**: Ready for deployment with Procfile
- **Railway**: Works out of the box
- **Vercel**: Configure serverless function
- **AWS/GCP**: Deploy as container or directly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## 📝 Future Enhancements

Potential improvements to consider:
- [ ] Difficulty levels (more emojis, complex equations)
- [ ] Score tracking and high scores
- [ ] Timer for solving puzzles
- [ ] Multiplayer support
- [ ] Sound effects and more animations
- [ ] Different equation types (subtraction, multiplication)
- [ ] Hint system
- [ ] Emoji themes and customization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues

Found a bug or have a suggestion? Please open an issue on the GitHub repository with:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

**Enjoy playing EmojiRiddle! 🎉**
