# Backend Architecture: GenAI Interview Preparation

This directory contains the Node.js/Express backend API. For full project setup instructions, please refer to the [Root README](../README.md).

## 🧩 Core Services

### 1. Google Gemini AI Integration (`src/services/ai.service.js`)
The backend uses the `@google/genai` SDK. It leverages **Structured Outputs** (`responseSchema`) to guarantee that the AI returns perfectly formatted, deterministic JSON arrays. This ensures the frontend never crashes due to malformed AI text.

### 2. HTML Generation (`src/services/ai.service.js` & `interview.controller.js`)
When a user requests to download their resume, the AI generates optimized, ATS-friendly HTML. The backend returns this raw HTML string to the frontend, which handles the actual conversion to PDF.

### 3. Authentication & Security
- Passwords are encrypted using `bcryptjs`.
- Sessions are managed via JWTs (`jsonwebtoken`).
- Tokens are stored in **Secure, HTTP-Only** cookies with `SameSite=none` configuration to allow cross-origin requests from the Vercel frontend.
- When a user logs out, their token is saved to a `tokenBlacklistModel` in MongoDB to immediately revoke access.

## 📍 API Documentation

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Creates a new user and sets auth cookie |
| POST | `/login` | Authenticates user and sets auth cookie |
| GET | `/logout` | Blacklists token and clears cookie |
| GET | `/get-me` | Returns current authenticated user data |

### Interview Reports (`/api/interview`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Fetches all reports for the logged-in user |
| GET | `/report/:id` | Fetches a specific report by ID |
| POST | `/` | Uploads resume (via `multer` & `pdf-parse`), queries AI, and saves report |
| POST | `/resume/pdf/:id` | Generates AI-optimized HTML and returns a JSON object containing the HTML string |

