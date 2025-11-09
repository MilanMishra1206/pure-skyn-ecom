import React from "react";
import { FaShieldAlt, FaTag, FaTruck } from "react-icons/fa"; // Example icons

const PRIMARY_COLOR = "#0f4a51";

function ProductBadges() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 px-4 text-center">
      <div className="flex flex-col items-center p-3 rounded-lg shadow-md bg-white">
        <FaShieldAlt size={28} className={`text-[${PRIMARY_COLOR}] mb-2`} />
        <span className="text-sm font-semibold text-gray-800">
          100% Original
        </span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-lg shadow-md bg-white">
        <FaTag size={28} className={`text-red-500 mb-2`} />
        <span className="text-sm font-semibold text-gray-800">
          Lowest Price
        </span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-lg shadow-md bg-white">
        <FaTruck size={28} className={`text-emerald-500 mb-2`} />
        <span className="text-sm font-semibold text-gray-800">
          Free Shipping
        </span>
      </div>
    </div>
  );
}

export default ProductBadges;
