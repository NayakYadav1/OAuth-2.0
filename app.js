// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { morganMiddleware } = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morganMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/api', productRoutes);

// Connect to MongoDB
connectDB();

module.exports = app;