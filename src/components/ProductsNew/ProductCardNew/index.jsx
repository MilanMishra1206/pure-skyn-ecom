import { Link } from "react-router-dom";

function ProductCardNew({ product, category }) {
  const productNameSlug = product.name.toLowerCase().replace(/\s/g, "_");
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/products/${category}/${productNameSlug}`} className="block">
      <div className="relative bg-white rounded-xl shadow-md flex flex-col items-center text-center p-4">
        {product.badge && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {product.badge}
          </div>
        )}
        {product.isDoctorsChoice && (
          <div className="absolute top-4 right-4 z-10">
            <img
              src="https://www.clinikally.com/cdn/shop/files/dermatologist-recommended-badge.png?v=1676644165"
              alt="Doctor's Choice"
              className="h-8"
            />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-sm font-semibold text-gray-900 mb-2 truncate w-full">
          {product.name}
        </h3>
        <div className="flex items-center text-sm mb-2">
          <div className="flex items-center text-sm">
            {renderStars(product.rating)}
            <span className="text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <button className="w-full py-2 rounded-full font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors">
          Add To Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCardNew;
