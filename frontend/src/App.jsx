import React from "react";
import Home from "./pages/Home";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { ErrorBoundary } from "react-error-boundary";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Inventory from "./pages/admin/Inventory";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/Orders";
import AdminLogin from "./pages/admin/Login";
import OrderDetail from "./pages/admin/OrderDetail";

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-6 bg-red-50 rounded-lg border border-red-200 m-4">
      <h2 className="text-xl font-semibold text-red-700 mb-2">
        Something went wrong:
      </h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};

// Protected Route Component for Admin
const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

// Protected Route Component for regular users
const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  return (
    <div>
      <Routes>
        {/* Admin Routes - No padding */}
        <Route
          path="/admin/*"
          element={
            <div>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <AdminProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute>
                      <Inventory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/add"
                  element={
                    <ProtectedRoute>
                      <AddProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <AdminOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<AdminLogin />} />
              </Routes>
            </div>
          }
        />

        {/* Auth Routes - No navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Routes - With padding and navbar */}
        <Route
          path="/*"
          element={
            <div className="px-4 sm:px-[5vw] md:px-[7px] lg:px-[9vw]">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <>
                      <Navbar />
                      <About />
                    </>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <>
                      <Navbar />
                      <Contact />
                    </>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <UserProtectedRoute>
                      <Navbar />
                      <Cart />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <>
                      <Navbar />
                      <Product />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <UserProtectedRoute>
                      <Navbar />
                      <Profile />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/collection"
                  element={
                    <>
                      <Navbar />
                      <Collection />
                    </>
                  }
                />
                <Route
                  path="/place-order"
                  element={
                    <UserProtectedRoute>
                      <Navbar />
                      <PlaceOrder />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <UserProtectedRoute>
                      <Navbar />
                      <Orders />
                    </UserProtectedRoute>
                  }
                />
              </Routes>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
