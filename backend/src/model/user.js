import mongoose from "mongoose";

/**
 * User schema representing registered application users.
 * Stores identity information and hashed authentication credentials.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true // Removes unnecessary whitespace around names
    },

    email: {
      type: String,
      required: true,
      unique: true, // Enforces unique email at database index level
      lowercase: true, // Normalizes email to prevent case-sensitive duplicates
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address"
      ]
    },

    password: {
      type: String,
      required: true,
      minlength: 6 // Basic safeguard; password is expected to be hashed
    }
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
  }
);

// Export User model for use in authentication and authorization workflows
export default mongoose.model("User", userSchema);
