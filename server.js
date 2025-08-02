// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './quickdesk-backend/config/db.js';

// Import routes
import authRoutes from './quickdesk-backend/routes/authRoutes.js';
import ticketRoutes from './quickdesk-backend/routes/ticketRoutes.js';
import categoryRoutes from './quickdesk-backend/routes/categoryRoutes.js';

// Setup __dirname with ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, './quickdesk-backend/uploads')));

// CORS config
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Rate Limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/categories', categoryRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
