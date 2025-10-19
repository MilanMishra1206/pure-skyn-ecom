import React from "react";
import { useParams } from "react-router-dom";
import { hairProductData, skinProductData } from "../../../helpers/dummyData";

// Map category names to their data sources
const categoryDataMap = {
  skin: skinProductData,
  hair: hairProductData,
  // Add other categories here
};

// Helper function to render star ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`star-${i}`} className="text-yellow-400">
        ★
      </span>
    );
  }
  return stars;
};

function SingleProductPage() {
  const { category, productName } = useParams();

  const allProducts = categoryDataMap[category] || [];

  // Find the product by its URL-friendly name
  const product = allProducts.find(
    (p) => p.name.toLowerCase().replace(/\s/g, "_") === productName
  );

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-600">
        Product not found. Please check the URL.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-0 bg-white shadow-lg rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Product Image Section */}
        <div className="flex justify-center items-center p-8 bg-gray-100 rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-96 object-contain"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-lg">
              {renderStars(product.rating)}
            </div>
            <span className="text-lg text-gray-600">{product.rating}</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-extrabold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-gray-500 line-through">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.badge && (
              <span className="text-sm font-semibold text-white bg-purple-600 px-2 py-1 rounded-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 py-3 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors">
              Add To Cart
            </button>
            <button className="flex-1 py-3 rounded-full font-semibold text-purple-600 border-2 border-purple-600 hover:bg-purple-50 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Product Description
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This is a placeholder for a detailed product description. It would
              cover key features, how to use it, and what makes it unique.
            </p>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Key Benefits
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Benefit 1: Addresses specific skin concerns.</li>
              <li>Benefit 2: Fast-absorbing and non-greasy formula.</li>
              <li>Benefit 3: Dermatologist-recommended ingredients.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
