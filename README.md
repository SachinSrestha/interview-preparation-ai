# 🚀 GenAI Interview Preparation Platform

A full-stack, AI-powered web application that generates personalized interview preparation strategies and optimized resumes. Built with the **MERN Stack** and **Google Gemini AI**.

## 🌍 Live Demo
- **Frontend (Vercel):** [https://interview-preparation-ai.vercel.app](https://interview-preparation-ai.vercel.app)
- **Backend API (Render):** [https://interview-prep-backend.onrender.com](https://interview-prep-backend.onrender.com)
> **Note:** The backend is hosted on a free Render instance. It spins down after 15 minutes of inactivity, so the **very first API request (like login/register) might take 30-50 seconds** to wake the server up. Subsequent requests will be extremely fast!

---

## 🌟 Key Features

- **🧠 AI Strategy Generation:** Upload your PDF resume (or a quick self-description) alongside a Target Job Description. The Google Gemini API analyzes the match and generates a highly tailored interview plan.
- **📊 Comprehensive Reports:**
  - **Match Score:** A percentage showing how well your profile fits the job.
  - **Technical & Behavioral Questions:** Anticipated questions, the interviewer's intent behind them, and strategies on how to answer.
  - **Skill Gaps:** Identifies missing requirements and their severity.
  - **Preparation Plan:** A day-by-day actionable study guide.
- **📄 AI-Optimized Resume Export:** The AI rewrites and formats an optimized, ATS-friendly resume based on your profile and the target job, which is dynamically converted to a downloadable PDF.
- **🔐 Secure Authentication:** JWT-based authentication using HTTP-only, secure, cross-origin cookies.

---

## 🛠️ Tech Stack

**Frontend:**
- **React 19** (Vite)
- **React Router** for protected and dynamic routing
- **SCSS** for responsive, modern styling
- **Axios** for API communication

**Backend:**
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database)
- **Google GenAI SDK** (Gemini 3 Flash Preview) for structured JSON AI responses
- **pdf-parse** for uploaded resume parsing
- **JWT & bcryptjs** for authentication

**PDF Generation:**
- **html2pdf.js** — Resume PDFs are generated **client-side** in the browser, eliminating the need for server-side Chromium/Puppeteer dependencies

---

## 💻 Local Setup Instructions

If you want to run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/SachinSrestha/interview-preparation-ai.git
cd interview-preparation-ai
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
CORS_ORIGIN=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Frontend
npm install
```
Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```
Start the frontend development server:
```bash
npm run dev
```
The application will now be running at `http://localhost:5173`.

---

## 🚀 Deployment Architecture

This project is fully configured for cloud deployment:
- **Frontend** is deployed on **Vercel** with a `vercel.json` configuration to handle Single Page Application (SPA) routing.
- **Backend** is deployed on **Render**. Express is configured with `trust proxy` to allow secure cross-origin cookies between Vercel and Render.
- **PDF Generation** happens entirely in the user's browser using `html2pdf.js` — the backend only returns AI-generated HTML, so no server-side Chromium is needed.
