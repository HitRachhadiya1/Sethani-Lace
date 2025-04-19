import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const LetestCollection = () => {
  const { products, currency } = useContext(ShopContext);

  // Get all products from the context as an array
  const productArray = Object.entries(products)
    .filter(([_, product]) => product.forSale)
    .slice(0, 8)
    .map(([id, product]) => ({
      id,
      ...product,
    }));

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8">
          Discover our newest selection of premium lace designs crafted with
          exceptional quality and attention to detail.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {productArray.map((product) => (
          <ProductItem key={product.id} product={product} currency={currency} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/collection">
          <button className="px-8 py-3 bg-[#414141] text-white hover:bg-black transition-colors">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LetestCollection;
