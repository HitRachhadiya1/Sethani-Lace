// API utility functions for making authenticated requests

const PRODUCT_BASE_URL = "/api/product";
const USER_BASE_URL = "/api/user";
const ORDER_BASE_URL = "/api/order";

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
  isAdmin = false,
  baseUrl = PRODUCT_BASE_URL
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
    const response = await fetch(`${baseUrl}${endpoint}`, config);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if there's content to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "An error occurred");
      }
      return data;
    } else {
      throw new Error("Response was not JSON");
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Common API operations
export const api = {
  // Auth operations
  login: (email, password) => {
    return fetchWithAuth(
      "/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      false,
      USER_BASE_URL
    );
  },

  adminLogin: async (email, password) => {
    try {
      const response = await fetch(`${USER_BASE_URL}/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }
      return data;
    } catch (error) {
      console.error("Admin login error:", error);
      throw error;
    }
  },

  register: (userData) => {
    return fetchWithAuth(
      "/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      },
      false,
      USER_BASE_URL
    );
  },

  // Product operations
  getProducts: async (isAdmin = false) => {
    return fetchWithAuth(`/list?isAdmin=${isAdmin}`, {}, isAdmin);
  },

  createProduct: async (formData) => {
    try {
      const response = await fetch(`${PRODUCT_BASE_URL}/add`, {
        method: "POST",
        body: formData, // Don't set Content-Type, let browser set it with boundary
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to create product");
      }
      return data;
    } catch (error) {
      console.error("Create product error:", error);
      throw error;
    }
  },

  getSingleProduct: async (productId, isAdmin = false) => {
    return fetchWithAuth(
      `/single?isAdmin=${isAdmin}`,
      {
        method: "POST",
        body: JSON.stringify({ productId }),
      },
      isAdmin
    );
  },

  removeProduct: async (id) => {
    return fetchWithAuth(
      `/remove`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      },
      true
    );
  },

  // Admin operations
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${PRODUCT_BASE_URL}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken(true)}`,
        },
        body: JSON.stringify({ id, ...productData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to update product");
      }
      return data;
    } catch (error) {
      console.error("Update product error:", error);
      throw error;
    }
  },

  getOrders: () => {
    return fetchWithAuth("/orders", {}, true);
  },

  createOrder: async (orderData) => {
    return fetchWithAuth(
      "/create",
      {
        method: "POST",
        body: JSON.stringify(orderData),
      },
      false,
      ORDER_BASE_URL
    );
  },

  getUserOrders: async () => {
    return fetchWithAuth("/user", {}, false, ORDER_BASE_URL);
  },

  getAllOrders: async () => {
    return fetchWithAuth("/all", {}, true, ORDER_BASE_URL);
  },

  updateOrderStatus: async (orderId, status) => {
    return fetchWithAuth(
      "/update-status",
      {
        method: "POST",
        body: JSON.stringify({ orderId, status }),
      },
      true,
      ORDER_BASE_URL
    );
  },

  getOrderById: async (orderId) => {
    return fetchWithAuth(`/order/${orderId}`, {}, true, ORDER_BASE_URL);
  },
};
