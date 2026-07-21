import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';

const REQUIRED_ENV_VARS = ['MONGODB_URI'];

function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(
      `FATAL: Missing required environment variables: ${missing.join(', ')}`
    );
    console.error('Please set these in your Render dashboard → Environment.');
    process.exit(1);
  }
}

validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '');
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use('/api/contact', contactRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

let server;

async function start() {
  try {
    console.log('Connecting to MongoDB…');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('FATAL: Failed to start server —', err?.message || err);
    process.exit(1);
  }
}

start();

// Graceful shutdown: close DB + HTTP server on SIGTERM / SIGINT
async function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully…`);
  if (server) {
    server.close(() => console.log('HTTP server closed'));
  }
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB:', err?.message || err);
  }
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
