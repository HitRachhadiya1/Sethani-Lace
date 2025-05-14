import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ product, currency, isAdmin = false }) => {
  const { addToCart } = useContext(ShopContext);

  // Don't render if product is not available for sale and user is not admin
  if (!isAdmin && !product.availableForSale) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  return (
    <div className="border border-gray-200 hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-[#414141]">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold text-[#414141]">
            {currency} {product.price}
          </p>
          {product.stock < 10 && (
            <p className="text-xs text-red-500">Only {product.stock} left</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Link to={`/product/${product.id}`}>
            <button className="w-full bg-white text-[#414141] border border-[#414141] py-2 text-sm hover:bg-[#414141] hover:text-white transition-colors">
              View Details
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock < 1}
            className={`w-full py-2 text-sm text-white ${
              product.stock < 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#414141] hover:bg-black transition-colors"
            }`}
          >
            {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
