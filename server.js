import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import morgan from "morgan";
import logger from "./config/logger.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(morgan("combined", { stream: logger.stream }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Server listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
