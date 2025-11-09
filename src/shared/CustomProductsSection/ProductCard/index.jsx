import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import HandleQuantity from "../../../components/ProductsCart/HandleQuantity";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../../redux/Actions";
import { useAppSnackbar } from "../../../config/Context/SnackbarContext";

const PRIMARY_COLOR = "#0f4a51";
const SECONDARY_COLOR = "#15676e";

function ProductCard({ product, isSingleProduct = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSnackbar = useAppSnackbar();

  // --- Redux State Check ---
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems?.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  // --- Cart Handlers ---
  const handleItemIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleItemDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      handleItemIncrease(existingItem);
      showSnackbar("Product Quantity Increased", "info");
    } else {
      dispatch(addToCart(product));
      showSnackbar("Product Added to Cart", "success");
    }
  };

  const handleItemRemove = (product) => {
    dispatch(removeFromCart(product.id));
    showSnackbar("Product Removed from Cart", "info");
  };

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
    <div
      className={`
        relative ${isSingleProduct ? "w-full md:!w-64" : "w-64"} min-w-64 bg-white p-4 flex flex-col items-center text-center
        rounded-xl border border-gray-100 shadow-md transition-all duration-300 ease-in-out
        hover:shadow-lg hover:ring-[${PRIMARY_COLOR}]
      `}
    >
      {/* Product Badge */}
      {product?.badge && (
        <div
          className={`absolute top-4 left-4 bg-[${PRIMARY_COLOR}] text-white text-xs font-semibold px-2 py-1 rounded-md`}
        >
          {product?.badge}
        </div>
      )}

      {/* Image */}
      <img
        src={product.imgSrc}
        alt={product?.productName}
        onClick={() =>
          navigate(`/products/${product?.category}/${product?.productName}`)
        }
        className="w-48 h-48 object-contain mb-4 cursor-pointer"
      />

      {/* Details */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 truncate w-full px-2">
        {product?.productName}
      </h3>

      <div className="flex items-center text-sm mb-2">
        <span className="text-yellow-400 mr-1">
          {renderStars(product?.ratings)}
        </span>
        <span className="text-gray-600">{product?.ratings}</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold text-gray-900">
          ₹{product?.productPrice?.toLocaleString("en-IN")}
        </span>
        {product.strikePrice && (
          <span className="text-sm text-gray-500 line-through">
            ₹{product?.strikePrice?.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      <div className="w-full">
        {isInCart ? (
          <HandleQuantity
            item={cartItem}
            handleItemIncrease={() => handleItemIncrease(cartItem)}
            handleItemDecrease={() => handleItemDecrease(cartItem)}
            handleItemRemove={() => handleItemRemove(cartItem)}
            isNotCartDrawer={true}
          />
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className={`w-full py-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer 
                        bg-[${PRIMARY_COLOR}] text-white hover:bg-[${SECONDARY_COLOR}] flex items-center justify-center gap-2`}
          >
            <FaCartPlus size="1.1rem" />
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
