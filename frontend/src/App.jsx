import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Inventory from "./pages/admin/Inventory";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/Orders";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7px] lg:px-[9vw]">
      {/* Non-admin routes include the Navbar */}
      <Routes>
        {/* Customer Routes */}
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
            <>
              <Navbar />
              <Cart />
            </>
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
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
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
            <>
              <Navbar />
              <PlaceOrder />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <Orders />
            </>
          }
        />

        {/* Admin Routes - No Navbar */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </div>
  );
};

export default App;
