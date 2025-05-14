import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link, useSearchParams } from "react-router-dom";

const Collection = () => {
  const { products, loading, currency } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("all");

  // Set initial filter from URL parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setFilter(categoryFromUrl);
    }
  }, [searchParams]);

  // Get unique categories from available products
  const categories = [
    "all",
    ...new Set(
      Object.values(products)
        .filter(item => item.availableForSale)
        .map(item => item.category)
    ),
  ];

  // Filter products based on selected category and availability
  const filteredProducts = Object.entries(products).filter(([_, item]) => {
    if (!item.availableForSale) return false;
    if (filter === "all") return true;
    return item.category === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="my-10">
      {/* Header Section */}
      <div className="text-center py-8">
        <Title text1={"OUR"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8">
          {filter === "all" 
            ? "Explore our exclusive range of high-quality lace designs crafted with precision and elegance."
            : `Browse our collection of ${filter} products.`
          }
        </p>
      </div>

      {/* Category Filter Section */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h3 className="text-lg font-medium text-[#414141] mb-4">Categories</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm border-2 transition-all duration-300 ${
                filter === category
                  ? "border-[#414141] bg-[#414141] text-white"
                  : "border-gray-300 hover:border-[#414141] text-gray-700 hover:text-[#414141]"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(([id, item]) => (
            <Link
              key={id}
              to={`/product/${id}`}
              className="border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-[#414141]">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-semibold text-[#414141]">
                    {currency} {item.price}
                  </p>
                  {item.stock < 10 && (
                    <p className="text-xs text-red-500">Only {item.stock} left</p>
                  )}
                </div>
                <button className="w-full mt-3 bg-white text-[#414141] border border-[#414141] py-2 text-sm hover:bg-[#414141] hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 px-6 py-2 text-sm text-[#414141] border border-[#414141] hover:bg-[#414141] hover:text-white transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
