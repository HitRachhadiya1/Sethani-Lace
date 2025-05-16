import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Check for success message from registration or redirect info
  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect to the page user was trying to access if available
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToAdminLogin = () => {
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md border-t-4 border-[#414141]">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#414141]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#414141] focus:border-[#414141]"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#414141] focus:border-[#414141]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#414141] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#414141] ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#414141] hover:text-black font-medium"
            >
              Register here
            </Link>
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Return to main site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
