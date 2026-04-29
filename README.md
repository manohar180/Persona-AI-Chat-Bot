# Scaler Persona Chatbot

A persona-based AI chatbot that lets you have real conversations with three Scaler/InterviewBit personalities — **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

**Live Demo:** [your-deployed-url-here]

---

## Screenshots

> Add screenshots here after running locally.

---

## Tech Stack

- **Frontend:** React + Vite
- **AI API:** Groq (LLaMA 3 70B)
- **Styling:** Pure CSS with CSS variables
- **Deployment:** Vercel / Netlify

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/scaler-persona-chatbot.git
cd scaler-persona-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Groq API key:

Get your Groq API key at: https://console.groq.com

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add the three environment variables in Vercel's project settings
4. Deploy

---

## Features

- 3 fully researched AI personas with distinct voices
- Persona switcher that resets conversation per persona
- Suggestion chips for each persona
- Typing indicator during API calls
- Graceful API error handling
- Mobile responsive layout