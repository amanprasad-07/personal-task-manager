import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function Login() {
  const navigate = useNavigate();

  // Local state for form fields and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles user authentication.
   * On success, stores user data locally and redirects to task dashboard.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password
      });

      // Persist authenticated user details
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to main application
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl w-96 border border-gray-200"
      >
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Login
        </h1>

        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 w-full px-4 py-3 mb-4 rounded-lg 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                     transition-all bg-white"
          placeholder="Email"
          type="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 w-full px-4 py-3 mb-6 rounded-lg 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                     transition-all bg-white"
          placeholder="Password"
          type="password"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                     font-medium transition-all shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p
          className="mt-5 text-sm text-blue-700 hover:underline cursor-pointer text-center 
                     transition-all"
          onClick={() => navigate("/register")}
        >
          Create account
        </p>
      </form>
    </div>
  );
}
