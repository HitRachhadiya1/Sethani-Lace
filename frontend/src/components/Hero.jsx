import React from "react";
import heroImage from "../assets/frontend_assets/E-193-09.jpg";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-[#414141] min-h-[400px] sm:min-h-[500px]">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-8 sm:py-0 px-4 sm:px-8">
        <div className="text-[#414141] max-w-lg">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-base sm:text-xl">PREMIUM LACE</p>
          </div>
          <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl py-2 sm:py-3 leading-tight sm:leading-relaxed">
            Elegant Design
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-medium text-base sm:text-xl">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          src={heroImage}
          alt="Premium Lace Collection"
          className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
