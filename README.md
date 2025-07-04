# Pulse

Pulse is a modern sentiment analysis app that uncovers how audiences really feel about YouTube videos. It allows users to "check the pulse" of trending videos, search topics, or analyze any specific YouTube URL.

This project was inspired by YouTube’s removal of public dislike counts in 2021, which reduced transparency into audience reactions. Pulse restores visibility by analyzing comments and surfacing emotional tone: positive, neutral, or negative.

---

## Why Pulse?

In November 2021, YouTube removed public dislike counts to promote respectful interactions. However, this change made it harder for viewers and creators to gauge audience sentiment. Pulse brings back transparency by analyzing YouTube comments with VADER, a lightweight rule-based sentiment analysis tool.  

While VADER provides quick insights, it has limitations in detecting sarcasm, subtlety, and nuanced context. Future versions of Pulse aim to integrate advanced NLP models for richer, more accurate sentiment analysis.

---

## Features

- View trending YouTube videos by category (Music, Gaming, News, Sports, Film)
- Search any topic and analyze results
- Paste any YouTube URL to analyze audience sentiment
- Visualize sentiment breakdown with interactive pie and bar charts
- Pastel-themed responsive user interface

---

## Live Demo

[https://pulse-app-one.vercel.app](https://pulse-app-one.vercel.app)

---

## Tech Stack

- Frontend: Next.js 13 (App Router), Tailwind CSS
- Backend: Next.js API Routes, Google YouTube Data API v3
- Sentiment Analysis: VADER Sentiment
- Deployment: Vercel

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cvhuynh1777/PulseApp.git
   cd PulseApp
2. Install dependencies
    npm install
3. Create a .env.local file in the toor directory and add API key
    YOUTUBE_API_KEY=your-youtube-api-key-here
4. Run Development Server
    npm run dev
5. Open http://localhost:3000 to view it in the browser.