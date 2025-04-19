import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing tokens on mount
  useEffect(() => {
    // Check for admin token
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setAdminToken(adminToken);

      const savedAdmin = localStorage.getItem("adminUser");
      if (savedAdmin) {
        try {
          setAdminUser(JSON.parse(savedAdmin));
        } catch (error) {
          console.error("Error parsing admin user data", error);
        }
      }
    }

    // Check for user token
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setUserToken(userToken);

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      }
    }

    setLoading(false);
  }, []);

  // User login function
  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);

      if (data.success) {
        // Store token and user data
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUserToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  // User logout function
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUserToken(null);
    setUser(null);
    navigate("/login");
  };

  // Admin login function
  const adminLogin = async (email, password) => {
    try {
      const data = await api.adminLogin(email, password);

      if (data.success) {
        // Store token and user data
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));

        setAdminToken(data.token);
        setAdminUser(data.admin);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  // Admin logout function
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdminToken(null);
    setAdminUser(null);
    navigate("/admin/login");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!userToken;
  };

  // Check if admin is authenticated
  const isAdminAuthenticated = () => {
    return !!adminToken;
  };

  const value = {
    user,
    adminUser,
    login,
    logout,
    adminLogin,
    adminLogout,
    isAuthenticated,
    isAdminAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
