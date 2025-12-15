import express from "express";
import {
  getTasks,
  getTaskById,
  postTask,
  updateTask,
  deleteTask,
  searchTasks,
  toggleTaskCompletion
} from "../controller/taskController.js";
import { taskValidator } from "../middleware/taskMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

/**
 * Create a new task.
 * Protected route with request validation.
 */
taskRouter.post("/", protect, taskValidator, postTask);

/**
 * Get all tasks for the authenticated user.
 */
taskRouter.get("/", protect, getTasks);

/**
 * Search tasks by query string.
 * Example: /api/tasks/search?search=meeting
 */
taskRouter.get("/search", protect, searchTasks);

/**
 * Get a single task by ID.
 */
taskRouter.get("/:id", protect, getTaskById);

/**
 * Update an existing task (partial updates supported).
 */
taskRouter.patch("/:id", protect, updateTask);

/**
 * Toggle task completion status.
 */
taskRouter.patch("/:id/complete", protect, toggleTaskCompletion);

/**
 * Delete a task.
 */
taskRouter.delete("/:id", protect, deleteTask);

export default taskRouter;
