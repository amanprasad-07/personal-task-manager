import Task from "../model/taskModel.js";

/**
 * Middleware to validate task creation/update requests.
 * Ensures required fields are present and enforces
 * user-scoped uniqueness for task names.
 */
export const taskValidator = async (req, res, next) => {
  try {
    const { name, priority, dueDate } = req.body;

    // Validate required task name
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Task name is required"
      });
    }

    // Validate required priority
    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Task priority is required"
      });
    }

    // Validate due date presence and format
    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "A valid due date is required"
      });
    }

    // Ensure task name is unique per user (not globally)
    const existingTask = await Task.findOne({
      name: name.trim(),
      createdBy: req.user.id
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "You already have a task with this name"
      });
    }

    next();
  } catch (error) {
    // Pass unexpected errors to centralized error handler
    next(error);
  }
};
