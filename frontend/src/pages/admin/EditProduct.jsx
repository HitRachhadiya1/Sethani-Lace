import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../utils/api";
import { assets } from "../../assets/frontend_assets/assets";
import { ShopContext } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const { adminUser } = useAuth();

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
    description: "",
    availableForSale: false,
  });

  const [customFields, setCustomFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.getSingleProduct(id, true);
        const productData = response.product;
        setProduct(productData);
        setFormData({
          name: productData.name,
          category: productData.category,
          price: productData.price,
          stock: productData.stock,
          description: productData.description || "",
          availableForSale: productData.availableForSale,
        });
        setCustomFields(productData.customFields || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCustomField = (e) => {
    e.preventDefault();
    if (newFieldName && newFieldValue) {
      setCustomFields([
        ...customFields,
        { fieldName: newFieldName, fieldValue: newFieldValue }
      ]);
      setNewFieldName("");
      setNewFieldValue("");
    }
  };

  const handleRemoveCustomField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        id: id,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        availableForSale: formData.availableForSale,
        customFields: customFields || []
      };
      
      const response = await api.updateProduct(updatedData);
      if (response.success) {
        navigate("/admin/products");
      } else {
        setError(response.message || "Failed to update product");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#414141] text-white px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="Logo" className="h-8" />
            <span className="font-medium">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Welcome, {adminUser.username}</span>
          </div>
        </div>
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#414141] text-white px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="Logo" className="h-8" />
            <span className="font-medium">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Welcome, {adminUser.username}</span>
          </div>
        </div>
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#414141] text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-8" />
          <span className="font-medium">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Welcome, {adminUser.username}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>
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
                ></textarea>
              </div>

              {/* Custom Fields Section */}
              <div className="md:col-span-2">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Fields</h3>
                  
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
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">{field.fieldName}</p>
                            <p className="text-sm text-gray-600">{field.fieldValue}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomField(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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

            {error && (
              <div className="mt-4 text-red-500 text-sm">{error}</div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#414141] text-white rounded hover:bg-black"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct; 