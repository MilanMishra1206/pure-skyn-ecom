import React from "react";

function ProductInfoCard({ image, title, description }) {
  return (
    <div className="max-w-xs bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48 w-full">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default ProductInfoCard;
