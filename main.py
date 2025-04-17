# main.py
# FastAPI backend for EmojiRiddle – static frontend + riddle check API

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.responses import JSONResponse, HTMLResponse
from pydantic import BaseModel
from random import randint, choice

app = FastAPI()

# Serve frontend files from /static
app.mount("/static", StaticFiles(directory="static"), name="static")

# Pydantic model for the riddle answer submission
class RiddleSubmission(BaseModel):
    guess: dict[str, int]  # e.g. {"🐶": 4, "🐱": 2}

# Store the current solution in memory (will be overwritten every /api/riddle call)
current_solution = {}

@app.get("/", response_class=HTMLResponse)
async def root_html(request: Request):
    html = Path("static/index.html").read_text(encoding="utf-8")
    return HTMLResponse(content=html, status_code=200)

@app.post("/api/check")
async def check_riddle(submission: RiddleSubmission):
    if submission.guess == current_solution:
        return JSONResponse({"result": "✅ Correct!"})
    return JSONResponse({"result": "❌ Incorrect!"})

@app.get("/api/riddle")
async def get_riddle():
    global current_solution
    emoji_pool = ["🐶", "🐱", "🐰", "🐵", "🦊", "🐸"]
    e1, e2 = choice(emoji_pool), choice(emoji_pool)
    while e2 == e1:
        e2 = choice(emoji_pool)

    # assign random values
    v1 = randint(1, 9)
    v2 = randint(1, 9)

    current_solution = {e1: v1, e2: v2}

    equations = [
        {"left": [e1, e1], "op": "+", "right": v1 + v1},
        {"left": [e1, e2], "op": "+", "right": v1 + v2}
    ]

    return {
        "equations": equations,
        "emojis": [e1, e2]
    }

