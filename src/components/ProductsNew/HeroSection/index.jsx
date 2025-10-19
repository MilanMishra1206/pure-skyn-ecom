import React from "react";
import Resources from "../../../config/Resources";

function HeroSection() {
  return (
    <div className="relative w-full h-80 bg-gray-100 flex items-center justify-center">
      <img
        src={Resources.images.home.banner.bannerMain}
        alt="Dandruff & Scalp Care"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative text-center text-black p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Dandruff & Scalp Care
        </h1>
        <p className="text-lg md:text-xl font-medium">10 Products</p>
      </div>
    </div>
  );
}

export default HeroSection;
