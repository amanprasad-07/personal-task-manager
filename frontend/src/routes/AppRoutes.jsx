import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register";
import Tasklist from "../pages/tasks/Tasklist";
import TaskCreate from "../pages/tasks/TaskCreate";
import TaskEdit from "../pages/tasks/TaskEdit";

// Centralized routing configuration for the client application.
// Defines all navigable paths and maps each route to its respective page component.
// Unauthorized or undefined paths are redirected to /login for controlled access.
export default function AppRoutes() {
  return (
    <Routes>

      {/* Default route: redirect root access to login page */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer management routes */}
      <Route path="/tasks" element={<Tasklist />} />
      <Route path="/tasks/new" element={<TaskCreate />} />
      <Route path="/tasks/:id/edit" element={<TaskEdit />} />

      {/* Fallback: handle unknown paths with safe redirection */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}
