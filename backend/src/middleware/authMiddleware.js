import jwt from "jsonwebtoken";
import User from "../model/user.js";

/**
 * Authentication middleware to protect private routes.
 *
 * Supports JWT authentication via:
 * 1. HTTP-only cookies
 * 2. Authorization header (Bearer token)
 *
 * On successful verification, the authenticated user
 * is attached to req.user for downstream controllers.
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Ensure cookies object exists before accessing it
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;

    // Fallback: Authorization header support (Bearer <token>)
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Reject request if no authentication token is found
    if (!token) {
      const error = new Error("Not authorized, authentication token missing");
      error.statusCode = 401;
      return next(error);
    }

    // Ensure JWT secret is configured
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // Verify token integrity and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch authenticated user and exclude sensitive fields
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      const error = new Error("Authenticated user not found");
      error.statusCode = 404;
      return next(error);
    }

    // Attach user object to request for access in controllers
    req.user = user;
    next();

  } catch (err) {
    // Handle expired, invalid, or tampered JWTs
    err.statusCode = 401;
    next(err);
  }
};
