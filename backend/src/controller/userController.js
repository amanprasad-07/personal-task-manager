import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

/**
 * Register a new user account.
 * Performs input validation, checks for duplicate users,
 * hashes the password, and persists user data.
 */
export const register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Normalize input
    email = email?.toLowerCase();

    // Field-level validation
    if (!name) {
      const error = new Error("Name is required");
      error.statusCode = 400;
      return next(error);
    }

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      return next(error);
    }

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      return next(error);
    }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.statusCode = 400;
      return next(error);
    }

    // Check for existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticate user credentials and issue a JWT.
 * Token is stored in an HTTP-only cookie for secure access.
 */
export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // Normalize input
    email = email?.toLowerCase();

    if (!email || !password) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    // Validate JWT configuration
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token in secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // optional: for client-side storage if needed
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};
