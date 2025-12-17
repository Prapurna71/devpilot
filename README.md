.

🚀 DevPilot — API Health Monitoring Platform

DevPilot is a production-grade API health monitoring system that continuously tracks the availability and performance of HTTP services.
It provides historical uptime data, response-time metrics, and a centralized dashboard for monitoring multiple APIs in real time.

🌐 Live Application

Frontend: https://devpilot-n5spqrd9h-prapurnas-projects.vercel.app

Backend API: https://devpilot-h1jj.onrender.com

🧠 What DevPilot Solves

Unlike simple /health endpoints that show only a current status, DevPilot:

Monitors APIs continuously

Stores historical health logs

Measures latency and uptime

Detects timeouts and instability

Works as an external observer (black-box monitoring)

This reflects how real-world uptime monitoring systems operate.

🏗️ System Architecture
High-Level Architecture
flowchart LR
    User[User Browser]
    Frontend[React + Vite<br/>Frontend]
    Backend[Node.js + Express<br/>API Server]
    DB[(PostgreSQL)]
    Cron[Monitoring Cron Job]
    ExternalAPI[Monitored APIs]

    User --> Frontend
    Frontend -->|REST API| Backend
    Backend --> DB
    Cron -->|Periodic Health Checks| ExternalAPI
    ExternalAPI -->|Status + Latency| Cron
    Cron --> DB

🔄 Monitoring Flow
sequenceDiagram
    participant Cron as Monitor Job
    participant API as External API
    participant DB as PostgreSQL

    Cron->>API: HTTP Request
    API-->>Cron: Status + Response Time
    Cron->>DB: Store Health Log

🔐 Authentication Flow
sequenceDiagram
    participant User
    participant Frontend
    participant Backend

    User->>Frontend: Enter credentials
    Frontend->>Backend: POST /auth/login
    Backend-->>Frontend: JWT Token
    Frontend->>Frontend: Store token

📊 Core Features

🔐 JWT-based authentication

⏱️ Scheduled API health checks

📈 Response time & uptime tracking

📜 Historical health logs

🗑️ Secure API removal (stops monitoring)

🌍 Cloud-deployed full-stack system

🛠️ Tech Stack
Frontend

React

Vite

Axios

React Router

Backend

Node.js

Express

Sequelize ORM

PostgreSQL (SSL-secured)

JWT Authentication

node-cron

Deployment

Frontend: Vercel

Backend: Render

Database: Render PostgreSQL

🧪 What DevPilot Monitors

✅ Public APIs
✅ Backend service URLs
✅ /health or /status endpoints
✅ Websites (HTTP availability)

❌ Auth-protected APIs (by design)
❌ WebSockets / gRPC services

⚠️ Known Platform Behavior

On free hosting platforms (e.g., Render free tier), services may sleep when idle.
Cold starts can cause temporary timeouts, which DevPilot correctly detects as downtime or slow responses.

This behavior reflects real user experience.

📌 Why This Project Matters

DevPilot demonstrates:

Real-world system design

External service monitoring

Cloud deployment & SSL configuration

Production debugging skills

Full-stack ownership

This is not a toy project — it mirrors how entry-level monitoring tools are built.

📄 License

MIT License

✨ Author

Built by Prapurna Narravula
