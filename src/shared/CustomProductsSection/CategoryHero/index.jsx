import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryHero({ details }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer h-[32rem]"
      onClick={() => navigate(details?.link)}
    >
      <div className="flex justify-center">
        <img
          src={details?.imgSrc}
          alt={details?.name}
          className="h-64 w-64"
        />
      </div>

      <div className="p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {details?.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {details?.description}
        </p>
      </div>
    </div>
  );
}

export default CategoryHero;
