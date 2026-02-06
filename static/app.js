import { createEmojiButton } from './button.js'

const gameBoard = document.getElementById("game-board")

fetch("/api/riddle")
  .then(res => res.json())
  .then(data => {
    renderEquations(data.equations)
    renderInputForm(data.emojis);
    setTimeout(() => document.querySelector('input')?.focus(), 10)
  })

function renderEquations(equations) {
  const container = document.createElement("div")
  container.id = "equation-block"
  equations.forEach(eq => {
    const row = document.createElement("div")
    row.innerText = `${eq.left[0]} + ${eq.left[1]} = ${eq.right}`
    row.style.fontSize = "1.5rem"
    row.style.margin = "0.3rem"
    container.appendChild(row)
  })
  gameBoard.appendChild(container)
}

function renderInputForm(emojis) {
  const wrapper = document.createElement("div")
  wrapper.id = "guess-wrapper"

  const form = document.createElement("form")
  form.id = "guess-form"

  emojis.forEach((emoji, index) => {
    const label = document.createElement("label")
    label.classList.add("guess-label")

    const emojiSpan = document.createElement("span")
    emojiSpan.textContent = emoji
    emojiSpan.style.marginRight = "0.5rem"
    emojiSpan.style.setProperty('--i', index) // For floating animation

    const input = document.createElement("input")
    input.type = "number"
    input.name = emoji
    input.required = true
    input.classList.add("input-field")

    label.appendChild(emojiSpan)
    label.appendChild(input)
    form.appendChild(label)
  })

  const btn = document.createElement("button")
  btn.type = "submit"
  btn.innerText = "Check ✅"
  btn.classList.add("btn-check")
  form.appendChild(btn)

  const feedback = document.createElement("div")
  feedback.id = "feedback"
  wrapper.appendChild(feedback)

  form.querySelector("input")?.focus()

  form.onsubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(form)
      const guess = {}
      for (let [key, value] of formData.entries()) {
        guess[key] = parseInt(value)
      }

      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess })
      })

      if (!res.ok) throw new Error("Server returned " + res.status)

      const result = await res.json()
      feedback.textContent = result.result
      feedback.style.opacity = 0
      
      // Add appropriate class for styling
      feedback.classList.remove('show-correct', 'show-incorrect')
      if (result.result.includes("✅")) {
        feedback.classList.add('show-correct')
      } else {
        feedback.classList.add('show-incorrect')
      }

      if (result.result.includes("❌")) {
        feedback.classList.remove("shake")
        void feedback.offsetWidth
        feedback.classList.add("shake")
      }

      setTimeout(() => {
        feedback.style.opacity = 1
        form.querySelector("input")?.focus()
        if (feedback.textContent.includes("✅")) {
          feedback.textContent += " 🎉 New round starts in 3 seconds..."
          setTimeout(() => location.reload(), 3000)
        }
      }, 50)
    } catch (err) {
      feedback.textContent = "⚠️ Error: " + err.message
      feedback.classList.remove('show-correct', 'show-incorrect')
      feedback.classList.add('show-incorrect')
      feedback.style.opacity = 1
    }
  }

  wrapper.appendChild(form)
  gameBoard.appendChild(wrapper)
}

