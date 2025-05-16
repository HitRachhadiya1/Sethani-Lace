import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    // Handle click outside to close search
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // Focus input when search is opened
    if (isOpen) {
      const timer = setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Filter products based on search term
    const results = Object.entries(products)
      .filter(([_, product]) => {
        const searchLower = value.toLowerCase();
        return (
          product.availableForSale &&
          (product.name.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower))
        );
      })
      .map(([id, product]) => ({
        id,
        ...product
      }))
      .slice(0, 5); // Limit to 5 results

    setSearchResults(results);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div
        ref={searchRef}
        className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-4 border-b">
          <div className="relative">
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#414141] focus:border-transparent"
            />
            <img
              src={assets.search_icon}
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b"
              >
                <img
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-sm font-medium text-[#414141]">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 