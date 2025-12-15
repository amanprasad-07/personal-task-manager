import express from "express";
import { login, register } from "../controller/userController.js";

const userRouter = express.Router();

/**
 * User authentication routes.
 * These routes are publicly accessible and do not require authentication.
 */

/**
 * Register a new user account.
 */
userRouter.post("/register", register);

/**
 * Authenticate an existing user and issue a JWT.
 */
userRouter.post("/login", login);

export default userRouter;
