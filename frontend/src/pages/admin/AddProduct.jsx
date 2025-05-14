import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { ShopContext } from "../../context/ShopContext";
import { api } from "../../utils/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);

  // Get unique categories for dropdown
  const categories = [
    "Lace",
    ...new Set(Object.values(products).map((item) => item.category)),
  ].filter(Boolean); // Remove any undefined or empty values

  const [formData, setFormData] = useState({
    name: "",
    category: "Lace", // Set default category to Lace
    price: "",
    stock: "",
    forSale: true,
    description: "",
    image: null,
    previewImage: null,
    availableForSale: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            image: files[0],
            previewImage: reader.result,
          }));
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNewCategory = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const newCategory = e.target.value.trim();
      setFormData((prev) => ({
        ...prev,
        category: newCategory,
      }));
      e.target.value = "";
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = "Product name is required";
    if (!formData.category) formErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      formErrors.price = "Valid price is required";
    if (formData.stock === "" || formData.stock < 0)
      formErrors.stock = "Valid stock quantity is required";
    if (!formData.image) formErrors.image = "Product image is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData object
      const productFormData = new FormData();
      productFormData.append("name", formData.name);
      productFormData.append("category", formData.category);
      productFormData.append("price", formData.price);
      productFormData.append("stock", formData.stock);
      productFormData.append("description", formData.description);
      productFormData.append("availableForSale", formData.availableForSale);
      
      // Append image files
      if (formData.image) {
        productFormData.append("image1", formData.image);
      }

      // Send to backend
      await api.createProduct(productFormData);
      
      // Navigate back to products page after successful submission
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-[#414141] text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-8" />
          <span className="font-medium">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Welcome, Admin</span>
          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-[calc(100vh-56px)] border-r border-gray-200 fixed">
          <nav className="py-4">
            <ul>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 border-l-4 border-[#414141] text-[#414141] font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/inventory"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Inventory
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/customers"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium text-[#414141]">
              Add New Product
            </h1>
            <Link
              to="/admin/products"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Products
            </Link>
          </div>

          <div className="bg-white rounded shadow border border-gray-100 p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Image Upload */}
                <div className="lg:col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-72 cursor-pointer ${
                        errors.image
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-[#414141]"
                      }`}
                      onClick={() =>
                        document.getElementById("product-image").click()
                      }
                    >
                      {formData.previewImage ? (
                        <img
                          src={formData.previewImage}
                          alt="Product Preview"
                          className="h-full object-contain"
                        />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-400 mb-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-500">
                            Click to upload product image
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG or GIF (Max 2MB)
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        id="product-image"
                        name="image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Product Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141] ${
                          errors.name ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category *
                      </label>
                      <div className="flex gap-2">
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141] ${
                            errors.category
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="+ New"
                            onKeyDown={handleNewCategory}
                            className="w-20 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                          />
                        </div>
                      </div>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141] ${
                          errors.price ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141] ${
                          errors.stock ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availableForSale"
                        checked={formData.availableForSale}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-[#414141] focus:ring-[#414141]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Available for Sale
                      </span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      When checked, this product will be visible to customers
                    </p>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                    ></textarea>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#414141] hover:bg-black"
                      } text-white rounded transition-colors`}
                    >
                      {isSubmitting ? "Saving..." : "Save Product"}
                    </button>
                    <Link
                      to="/admin/products"
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
