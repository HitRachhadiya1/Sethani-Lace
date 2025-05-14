import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const LetestCollection = () => {
  const { products, loading, currency } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = [
    "all",
    ...new Set(
      Object.entries(products)
        .filter(([_, product]) => product.availableForSale)
        .map(([_, product]) => product.category)
    ),
  ];

  // Get all available products from the context as an array
  const productArray = Object.entries(products)
    .filter(([_, product]) => {
      if (!product.availableForSale) return false;
      if (selectedCategory === "all") return true;
      return product.category === selectedCategory;
    })
    .slice(0, 8)
    .map(([id, product]) => ({
      id,
      ...product,
    }));

  if (loading) {
    return (
      <div className="my-10">
        <div className="text-center py-8">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (productArray.length === 0) {
    return null;
  }

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8">
          Discover our newest selection of premium lace designs crafted with
          exceptional quality and attention to detail.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm border transition-all duration-300 ${
                selectedCategory === category
                  ? "border-[#414141] bg-[#414141] text-white"
                  : "border-gray-200 hover:border-[#414141] text-gray-700 hover:text-[#414141]"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {productArray.map((product) => (
          <ProductItem key={product.id} product={product} currency={currency} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to={`/collection?category=${selectedCategory !== 'all' ? selectedCategory : ''}`}>
          <button className="px-8 py-3 bg-[#414141] text-white hover:bg-black transition-colors">
            View All {selectedCategory !== 'all' ? selectedCategory : ''} Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LetestCollection;
