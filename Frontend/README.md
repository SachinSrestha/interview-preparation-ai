# Frontend Architecture: GenAI Interview Preparation

This directory contains the React/Vite frontend application. For full project setup instructions, please refer to the [Root README](../README.md).

## 🧩 Structure & Philosophy

This application is built using a **feature-based architecture**. Instead of grouping files by type (e.g., all components together, all hooks together), files are grouped by feature domain:

```
src/
├── app.routes.jsx      # Main application routing
├── components/         # Shared global UI components (e.g., Loader)
├── features/
│   ├── auth/           # Authentication domain (Login, Register, auth API)
│   └── interview/      # Core app domain (Dashboard, PDF Generation, API)
└── style/              # Global SCSS tokens and utility classes
```

## 🔐 State Management & Authentication

- The application uses React Context (`InterviewContext`, `AuthContext`) to manage global state and avoid prop drilling.
- Authentication state is automatically managed via a `useAuth` hook which listens to `httpOnly` secure cookies set by the backend.

## 🌐 API Communication

All API calls are centralized in service files (e.g., `auth.api.js`, `interview.api.js`) using **Axios**. 
- Axios is configured with `withCredentials: true` to ensure cookies are sent securely across origins.
- API Base URL is controlled via the `VITE_API_URL` environment variable.

## 📄 Client-Side PDF Generation

To avoid memory and dependency issues on cloud servers, PDF generation is handled entirely on the client side. 
- The backend API (`/api/interview/resume/pdf/:id`) returns AI-generated HTML.
- The frontend dynamically imports `html2pdf.js`, renders the HTML in a hidden container, and triggers a direct browser download.

## 🚀 Vercel Deployment & Routing

Because this is a Single Page Application (SPA) using React Router, it relies on client-side routing.
When deployed to static hosts like Vercel, navigating directly to a deep link (like `/interview/123`) would normally result in a `404 Not Found` error. 

To solve this, this folder includes a `vercel.json` file:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This ensures the Vercel server always serves `index.html`, allowing React Router to handle the URL.
