import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BackButton from "../../components/Backbutton";

export default function TaskCreate() {
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "low",
    dueDate: ""
  });

  const [error, setError] = useState("");

  // Update form state dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles task creation.
   * Performs basic client-side validation before API call.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!formData.name || !formData.priority || !formData.dueDate) {
      setError("Task name, priority, and due date are required");
      return;
    }

    try {
      await axiosInstance.post("/tasks", formData);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <BackButton />

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add New Task
        </h1>

        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Task name"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />

          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task description (optional)"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />

          {/* Priority dropdown */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>

          <input
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                       font-medium shadow-md hover:shadow-lg transition-all"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
