import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryHero({ details }) {
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-[30rem] cursor-pointer"
      onClick={() => navigate(details?.link)}
    >
      <div className="w-full h-full aspect-[2/1] md:!aspect-auto hover:!shadow-md">
        <img
          src={details?.imgSrc}
          alt={details?.name}
          className="w-full h-full object-cover absolute inset-0"
          style={{ minHeight: "100%", minWidth: "100%" }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {details?.name}
        </h3>
        <p className="text-sm text-gray-600">{details?.description}</p>
      </div>
    </div>
  );
}

export default CategoryHero;
