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
  ].filter(Boolean);

  const [formData, setFormData] = useState({
    name: "",
    category: "Lace",
    price: "",
    stock: "",
    forSale: true,
    description: "",
    image: null,
    previewImage: null,
    availableForSale: false,
  });

  const [customFields, setCustomFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
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

  const handleAddCustomField = (e) => {
    e.preventDefault();
    if (newFieldName && newFieldValue) {
      setCustomFields([
        ...customFields,
        { fieldName: newFieldName, fieldValue: newFieldValue },
      ]);
      setNewFieldName("");
      setNewFieldValue("");
    }
  };

  const handleRemoveCustomField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
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
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.image) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      productFormData.append("customFields", JSON.stringify(customFields));
      
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
      <div className="bg-[#414141] text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-6 sm:h-8" />
          <span className="font-medium text-sm sm:text-base">Admin Panel</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-sm sm:text-base">Welcome, {adminUser.username}</span>
          <button
            onClick={handleLogout}
            className="px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs sm:text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-64 bg-white sm:h-[calc(100vh-56px)] border-b sm:border-r border-gray-200 sm:fixed">
          <nav className="py-2 sm:py-4">
            <ul className="flex sm:block overflow-x-auto sm:overflow-visible">
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
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="sm:ml-64 flex-1">
          <div className="p-4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
              <Link
                to="/admin/products"
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              >
                Back to Products
              </Link>
            </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                        required
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                        required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                        required
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                        required
                      min="0"
                    />
                    {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                    )}
                  </div>

                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                        required
                    ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                      )}
                  </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                        required
                      />
                      {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                      )}
                      {formData.previewImage && (
                        <img
                          src={formData.previewImage}
                          alt="Preview"
                          className="mt-2 h-32 object-cover rounded"
                        />
                      )}
                    </div>

                    {/* Custom Fields Section */}
                    <div className="md:col-span-2">
                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Custom Fields
                        </h3>

                        {/* Add New Custom Field */}
                        <div className="flex gap-4 mb-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={newFieldName}
                              onChange={(e) => setNewFieldName(e.target.value)}
                              placeholder="Field Name"
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={newFieldValue}
                              onChange={(e) => setNewFieldValue(e.target.value)}
                              placeholder="Field Value"
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#414141]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleAddCustomField}
                            className="px-4 py-2 bg-[#414141] text-white rounded text-sm hover:bg-black"
                          >
                            Add Field
                          </button>
                        </div>

                        {/* Custom Fields List */}
                        {customFields.length > 0 && (
                          <div className="space-y-2">
                            {customFields.map((field, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 p-3 bg-gray-50 rounded"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-700">
                                    {field.fieldName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {field.fieldValue}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCustomField(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
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
                  </div>
                </div>

                {errors.submit && (
                    <div className="mt-4 text-red-500 text-sm">{errors.submit}</div>
                )}

                  <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                      className={`px-6 py-2 bg-[#414141] text-white rounded hover:bg-black ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                      {isSubmitting ? "Adding Product..." : "Add Product"}
                </button>
              </div>
            </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
