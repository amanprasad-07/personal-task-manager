import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import taskRouter from "./router/taskRouter.js";
import userRouter from "./router/userRouter.js";
import { connectDb } from "./config/db.js";
import { errorHandler } from "./error/taskError.js";

// Load environment variables before anything else
dotenv.config();

const app = express();

/**
 * Core middleware
 */
app.use(express.json());
app.use(cookieParser());

/**
 * CORS configuration
 * Allows frontend to send cookies for authentication
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);

/**
 * Application routes
 */
app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

/**
 * Centralized error handling middleware
 * Must be registered after all routes
 */
app.use(errorHandler);

/**
 * Database connection and server startup
 */
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
