import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Collection = () => {
  const { products, currency } = useContext(ShopContext);
  const [filter, setFilter] = useState("all");

  // Get unique categories
  const categories = [
    "all",
    ...new Set(Object.values(products).map((item) => item.category)),
  ];

  // Filter products based on selected category
  const filteredProducts = Object.entries(products).filter(([id, item]) => {
    if (filter === "all") return item.forSale;
    return item.category === filter && item.forSale;
  });

  return (
    <div className="my-10">
      {/* Header Section */}
      <div className="text-center py-8">
        <Title text1={"OUR"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8">
          Explore our exclusive range of high-quality lace designs crafted with
          precision and elegance.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 text-xs sm:text-sm border border-[#414141] ${
              filter === category
                ? "bg-[#414141] text-white"
                : "bg-white text-[#414141]"
            } hover:bg-[#414141] hover:text-white transition-colors`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(([id, item]) => (
          <div
            key={id}
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
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Collection;
