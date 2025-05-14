import React, { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { products, loading } = useContext(ShopContext);

  // Get the first available product for the hero image
  const heroProduct = Object.values(products).find(product => product.availableForSale);

  return (
    <div className="flex flex-col sm:flex-row border border-[#414141]">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-xl ">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-6xl sm:py-3 lg:text 5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-medium text-xl ">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"> </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        {loading ? (
          <div className="w-full h-full bg-gray-100 animate-pulse"></div>
        ) : heroProduct ? (
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
