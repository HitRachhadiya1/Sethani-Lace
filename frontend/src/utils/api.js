// API utility functions for making authenticated requests

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Get auth token based on user type (admin or regular user)
const getAuthToken = (isAdmin = false) => {
  return isAdmin
    ? localStorage.getItem("adminToken")
    : localStorage.getItem("userToken");
};

// Generic fetch function with authentication
export const fetchWithAuth = async (
  endpoint,
  options = {},
  isAdmin = false
) => {
  const token = getAuthToken(isAdmin);

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Network error" };
  }
};

// Common API operations
export const api = {
  // Auth operations
  login: (email, password) => {
    return fetchWithAuth("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  adminLogin: (email, password) => {
    return fetchWithAuth("/api/user/admin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: (userData) => {
    return fetchWithAuth("/api/user/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Admin operations
  getProducts: () => {
    return fetchWithAuth("/api/products", {}, true);
  },

  createProduct: (productData) => {
    return fetchWithAuth(
      "/api/products",
      {
        method: "POST",
        body: JSON.stringify(productData),
      },
      true
    );
  },

  updateProduct: (id, productData) => {
    return fetchWithAuth(
      `/api/products/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(productData),
      },
      true
    );
  },

  deleteProduct: (id) => {
    return fetchWithAuth(
      `/api/products/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },

  getOrders: () => {
    return fetchWithAuth("/api/orders", {}, true);
  },
};
