import mongoose from "mongoose";

/**
 * Task schema representing individual user tasks.
 * Each task belongs to a specific user and supports
 * prioritization, due dates, and completion tracking.
 */
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100 // Prevents excessively long task titles
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500 // Keeps task descriptions reasonable
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low" // Default priority for newly created tasks
    },

    dueDate: {
      type: Date,
      index: true // Optimizes sorting and filtering by due date
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true // Improves performance for user-specific queries
    },

    completed: {
      type: Boolean,
      default: false // Indicates whether the task has been completed
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

// Export Task model for CRUD and task lifecycle management
export default mongoose.model("Task", taskSchema);
