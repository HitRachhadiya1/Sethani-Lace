import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { ShopContext } from "../../context/ShopContext";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const { adminUser, adminLogout } = useAuth();

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

  const handleLogout = () => {
    adminLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-[#414141] text-white px-4 sm:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-6 sm:h-8" />
          <span className="font-medium text-sm sm:text-base">Admin Panel</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-sm sm:text-base">Welcome, {adminUser.username}</span>
          <button className="px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs sm:text-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar - Similar to Dashboard component */}
        <div className="w-full sm:w-64 bg-white sm:h-[calc(100vh-56px)] border-b sm:border-r border-gray-200 sm:fixed">
          <nav className="py-2 sm:py-4">
            <ul className="flex sm:block overflow-x-auto sm:overflow-visible">
              {[
                {
                  to: "/admin/dashboard",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  ),
                  text: "Dashboard"
                },
                {
                  to: "/admin/products",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  ),
                  text: "Products",
                  active: true
                },
                // ... other menu items
              ].map((item, index) => (
                <li key={index} className="min-w-[120px] sm:min-w-0">
                  <Link
                    to={item.to}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 ${
                      item.active
                        ? "bg-gray-100 border-b-2 sm:border-b-0 sm:border-l-4 border-[#414141] text-[#414141] font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm whitespace-nowrap">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="sm:ml-64 flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-medium text-[#414141]">Add New Product</h1>
              <Link
                to="/admin/products"
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-600 rounded text-xs sm:text-sm hover:bg-gray-200"
              >
                Back to Products
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 sm:p-6">
                {/* Image Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {formData.previewImage ? (
                        <img
                          src={formData.previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="w-full sm:w-2/3">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                      {errors.image && (
                        <p className="mt-1 text-xs text-red-500">{errors.image}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                      <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                      placeholder="Enter stock quantity"
                      min="0"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-xs text-red-500">{errors.stock}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                      placeholder="Enter product description"
                    ></textarea>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availableForSale"
                        checked={formData.availableForSale}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-[#414141] focus:ring-[#414141]"
                      />
                      <span className="text-sm text-gray-700">Available for Sale</span>
                    </label>
                  </div>
                </div>

                {errors.submit && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                    {errors.submit}
                  </div>
                )}
              </div>

              <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <Link
                  to="/admin/products"
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded text-sm text-white ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#414141] hover:bg-black"
                  }`}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
