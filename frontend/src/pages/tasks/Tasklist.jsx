import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function Tasklist() {
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/tasks");
        setTasks(res.data.data);
      } catch {
        setError("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.get(`/tasks/search?search=${search}`);
      setTasks(res.data.data);
    } catch {
      setError("Search failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const res = await axiosInstance.patch(`/tasks/${id}/complete`);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data.data : task))
      );
    } catch {
      setError("Failed to update task");
    }
  };

  const priorityStyles = {
    low: "border-green-300 bg-green-50",
    medium: "border-yellow-300 bg-yellow-50",
    high: "border-red-300 bg-red-50"
  };

  const completedStyles =
    "opacity-60 bg-gray-100 border-gray-300 line-through";

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    const pDiff =
      priorityOrder[a.priority] - priorityOrder[b.priority];
    if (pDiff !== 0) return pDiff;

    const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
    return dateA - dateB;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            PERSONAL TASK MANAGER
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/tasks/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Task
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="border w-full px-4 py-3 rounded-lg"
          />
          <button className="bg-gray-800 text-white px-5 rounded-lg">
            Search
          </button>
        </form>

        <div className="space-y-4">
          {sortedTasks.map((c) => (
            <div
              key={c._id}
              className={`border p-5 rounded-xl flex justify-between items-center
              ${c.completed ? completedStyles : priorityStyles[c.priority]}`}
            >
              <div>
                <p className="font-semibold text-lg">{c.name}</p>
                <p className="text-sm">{c.description}</p>
                <p className="text-sm">Priority: {c.priority}</p>
                <p className="text-sm">
                  Due: {c.dueDate ? new Date(c.dueDate).toLocaleDateString() : "—"}
                </p>
                {c.completed && (
                  <span className="text-xs font-semibold">✔ Completed</span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleToggleComplete(c._id)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    c.completed ? "bg-gray-500" : "bg-purple-600"
                  }`}
                >
                  {c.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => handleDelete(c._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

                <button
                  disabled={c.completed}
                  onClick={() => navigate(`/tasks/${c._id}/edit`)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    c.completed
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
