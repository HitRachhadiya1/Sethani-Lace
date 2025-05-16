import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ product, currency, isAdmin = false }) => {
  const { addToCart, cart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(cart.some(item => item.id === product.id));

  // Don't render if product is not available for sale and user is not admin
  if (!isAdmin && !product.availableForSale) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isInCart) {
      navigate('/cart');
    } else {
      addToCart(product.id, 1);
      setIsInCart(true);
    }
  };

  return (
    <div className="border border-gray-200 hover:shadow-md transition-shadow rounded-lg overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-medium text-[#414141] line-clamp-1">{product.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 mb-3">
          <p className="font-semibold text-[#414141] text-sm sm:text-base">
            {currency} {product.price}
          </p>
          {product.stock < 10 && (
            <p className="text-xs text-red-500">Only {product.stock} left</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/product/${product.id}`} className="w-full">
            <button className="w-full bg-white text-[#414141] border border-[#414141] py-2 text-xs sm:text-sm hover:bg-[#414141] hover:text-white transition-colors rounded">
              View Details
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock < 1}
            className={`w-full py-2 text-xs sm:text-sm text-white rounded ${
              product.stock < 1
                ? "bg-gray-400 cursor-not-allowed"
                : isInCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#414141] hover:bg-black"
            } transition-colors`}
          >
            {product.stock < 1 ? "Out of Stock" : isInCart ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
