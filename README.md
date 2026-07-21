# Sandesh Jadhav — Portfolio

A modern portfolio with **React** frontend and **Node.js + MongoDB** backend for contact form with Gmail notifications.

## Project Structure

```
sandesh-portfolio-vercel/
├── frontend/          ← React + Vite + Tailwind
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           ← Express + MongoDB + Nodemailer
│   ├── src/
│   └── package.json
└── .gitignore
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Gmail App Password
npm run dev
```

**Gmail App Password:** Google Account → Security → 2-Step Verification → App passwords

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`

## Contact Form Flow

1. Visitor submits form → saved to MongoDB
2. You receive email at `sandeshjadhavv1002@gmail.com`
3. Visitor receives thank-you email from your Gmail

## Deploy

| Part | Platform |
|------|----------|
| Frontend | Vercel (root: `frontend/`) |
| Backend | Render / Railway |
| Database | MongoDB Atlas (free) |

Set `VITE_API_URL` in Vercel to your backend URL.
