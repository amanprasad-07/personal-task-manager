import Task from "../model/taskModel.js";

/**
 * Fetch all tasks belonging to the authenticated user.
 * Returns an empty array if no tasks are found.
 */
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });

    res.status(200).json({
      success: true,
      message:
        tasks.length === 0
          ? "No tasks added yet"
          : "Tasks retrieved successfully",
      data: tasks
    });
  } catch (error) {
    // Forward unexpected errors to centralized error handler
    next(error);
  }
};

/**
 * Retrieve a single task by ID.
 * Ensures task ownership by scoping query to authenticated user.
 */
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new task for the authenticated user.
 * Input validation is handled by dedicated middleware.
 */
export const postTask = async (req, res, next) => {
  try {
    const { name, description, priority, dueDate } = req.body;

    const newTask = await Task.create({
      name,
      description,
      priority,
      dueDate,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing task.
 * Only provided fields are updated (partial update support).
 */
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    const { name, description, priority, dueDate } = req.body;

    // Update fields only if explicitly provided
    if (name !== undefined) task.name = name;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task owned by the authenticated user.
 */
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search tasks by name, description, or priority.
 * Search is case-insensitive and scoped to the authenticated user.
 */
export const searchTasks = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const tasks = await Task.find({
      createdBy: req.user.id,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { priority: { $regex: search, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      message:
        tasks.length === 0
          ? "No matching tasks found"
          : "Search results retrieved",
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle completion status of a task.
 * Allows marking tasks as completed or undoing completion.
 */
export const toggleTaskCompletion = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task completion status updated",
      data: task
    });
  } catch (error) {
    next(error);
  }
};
