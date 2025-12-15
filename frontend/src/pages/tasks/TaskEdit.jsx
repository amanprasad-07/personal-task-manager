import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BackButton from "../../components/Backbutton";

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  // Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/tasks/${id}`);
        setFormData(res.data.data);
      } catch (err) {
        setError("Failed to load task");
      }
    };

    fetchTask();
  }, [id]);

  if (!formData) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!formData.name || !formData.priority || !formData.dueDate) {
      setError("Task name, priority, and due date are required");
      return;
    }

    try {
      await axiosInstance.patch(`/tasks/${id}`, formData);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <BackButton />

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Edit Task
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
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Task name"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          />

          <input
            name="description"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Task description"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          />

          {/* Priority dropdown */}
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>

          <input
            name="dueDate"
            type="date"
            value={formData.dueDate?.split("T")[0]}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-3 rounded-lg
                       focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg
                       font-medium shadow-md hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
