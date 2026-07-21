import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '');
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use('/api/contact', contactRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
