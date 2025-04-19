import React from "react";
import { assets, products } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-[#414141]">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-xl ">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-6xl sm:py-3 lg:text 5xl leading-relaxed">
            Latest Arrivls
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-medium text-xl ">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"> </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          src={products.e_193_09.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
