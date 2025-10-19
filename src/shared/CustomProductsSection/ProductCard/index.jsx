import React from "react";

function ProductCard({ product }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ½
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="relative w-64 min-w-64 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center border border-gray-200">
      {product.badge && (
        <div className="absolute top-4 left-4 bg-[#0f4a51] text-white text-xs font-semibold px-2 py-1 rounded-md">
          {product.badge}
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-48 h-48 object-contain mb-4"
      />
      <h3 className="text-base font-semibold text-gray-900 mb-2 truncate w-full">
        {product.name}
      </h3>
      <div className="flex items-center text-sm mb-2">
        <span className="text-yellow-400 mr-1">
          {renderStars(product.rating)}
        </span>
        <span className="text-gray-600">{product.rating}</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold text-gray-900">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.oldPrice && (
          <span className="text-sm text-gray-500 line-through">
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </span>
        )}
      </div>
      <button
        className={`w-full py-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer
          ${
            product.name.includes("Melanil")
              ? "bg-gray-200 text-[#0f4a51]"
              : "bg-[#0f4a51] text-white"
          }
        `}
      >
        {product.name.includes("Melanil") ? "Select Options" : "Add To Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
