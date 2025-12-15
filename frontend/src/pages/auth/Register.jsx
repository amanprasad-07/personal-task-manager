import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function Register() {
  const navigate = useNavigate();

  // Local state for form inputs and error handling
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles new user registration.
   * On success, redirects user to login screen.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await axiosInstance.post("/auth/register", {
        name,
        email,
        password
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl w-96 border border-gray-200 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg 
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none 
                     transition-all"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg 
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none 
                     transition-all"
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg 
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none 
                     transition-all"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg 
                     font-medium shadow-md hover:shadow-lg transition-all"
        >
          Register
        </button>

        <p
          className="text-center text-sm text-green-700 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
