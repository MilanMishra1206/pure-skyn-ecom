import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { TbMoodSadSquint } from "react-icons/tb";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import {
  emptyCart,
  removeFromCart,
  updateQuantity,
} from "../../../redux/Actions";
import Resources from "../../../config/Resources";
import { INRCurrency } from "../../../helpers/Regex";
import HandleQuantity from "../HandleQuantity";
import BuyMoreProducts from "../../Products/ProductsDetails/BuyMoreProducts";
import DrawerComponent from "../../../shared/DrawerComponent";
import ConfirmationModal from "../ConfirmationModal";

// --- Custom Tailwind Button Component (Assuming this structure for branding) ---
const BrandedButton = ({ label, onClick, startIcon, className = "" }) => (
  <button
    onClick={onClick}
    className={`group flex items-center cursor-pointer justify-center rounded-lg font-medium py-3 px-4 transition duration-300 w-full 
      bg-[#0f4a51] text-white hover:bg-[#15676e] active:bg-[#0f4a51] ${className}`}
  >
    {startIcon}
    <span className="ml-2">{label}</span>
  </button>
);
// ----------------------------------------------------------------------------

function CartDrawer({ openCart, handleOpenCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [removeItem, setRemoveItem] = useState(false);
  const [removeMessage, setRemoveMessage] = useState("");
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [originalCartValue, setOriginCartValue] = useState(0);

  const cartItems = useSelector((state) => state.cart.items);

  // Helper function for consistent price calculation
  const getTotalForItem = (item) => item.quantity * +item.productPrice;
  const SHIPPING_THRESHOLD = 500;

  useEffect(() => {
    // Calculate final discounted/total value (if discounts were applied here)
    setTotalCartValue(
      cartItems.reduce((acc, item) => acc + getTotalForItem(item), 0)
    );
    // Calculate original value (for free shipping comparison)
    setOriginCartValue(
      cartItems.reduce((acc, item) => acc + getTotalForItem(item), 0)
    );
  }, [cartItems]);

  const availableCoupons = [
    {
      id: 1,
      couponCode: "PS30",
      description: "30% off on the cart value",
      percentOff: 30,
    },
    {
      id: 2,
      couponCode: "PS40",
      description: "40% off on the cart value",
      percentOff: 40,
    },
  ];

  const handleCartSubmit = () => {
    navigate("/products-cart");
    handleOpenCart();
  };

  const handleItemIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleItemDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleItemRemove = (productId) => {
    setRemoveItem(true);
    setRemoveMessage(
      "Are you sure you want to remove this product from the cart?"
    );
    setIsEmptyCart(false);
    setProductId(productId);
  };

  const handleCancel = () => {
    setRemoveItem(false);
    setRemoveMessage("");
    setIsEmptyCart(false);
  };

  const confirmRemove = () => {
    isEmptyCart ? dispatch(emptyCart()) : dispatch(removeFromCart(productId));
    setRemoveItem(false);
  };

  const freeDeliveryStatus = () => {
    if (originalCartValue >= SHIPPING_THRESHOLD) {
      return (
        <p className="font-bold text-lg">
          CONGRATS! You get <span className="text-white">FREE SHIPPING</span> 🎉
        </p>
      );
    } else {
      const remaining = SHIPPING_THRESHOLD - originalCartValue;
      return (
        <p className="text-sm font-medium">
          Only{" "}
          <span className="font-bold text-white">{INRCurrency(remaining)}</span>{" "}
          away from <span className="font-bold">FREE SHIPPING</span>
        </p>
      );
    }
  };

  return (
    <DrawerComponent
      title="Cart"
      openDrawer={openCart}
      showClose
      onClose={handleOpenCart}
      childClassName="md:!h-screen"
    >
      <div className="flex flex-col">
        {cartItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-5 pt-10 flex-grow">
            <img
              src={Resources.images.cart.emptyCart}
              className="h-52"
              alt="empty cart"
            />
            <p className="text-xl font-bold text-center text-gray-700 mt-4">
              Your cart is empty. Let's add some items! ⚡
            </p>
            <BrandedButton
              label="Continue Shopping"
              onClick={() => {
                navigate("/products");
                handleOpenCart();
              }}
              startIcon={<FaCartPlus size="1.2rem" />}
              className="mt-6 rounded-3xl"
            />
          </div>
        ) : (
          // --- Cart Content (Scrollable) ---
          <div className="flex-grow overflow-y-auto pb-4">
            {/* 1. Free Shipping & Coupon Section */}
            <div className="sticky top-0 z-10 bg-white shadow-sm pt-2">
              {/* Free Shipping Meter/Message */}
              <div className="p-3 text-center text-white bg-[#15676e] font-bold">
                {freeDeliveryStatus()}
              </div>

              {/* Available Coupons */}
              <div className="bg-white text-gray-800 border-b pb-2">
                <p className="font-bold text-lg text-center p-2 pt-3 text-[#0f4a51]">
                  Available Coupons
                </p>
                {availableCoupons.length === 0 ? (
                  <div className="flex font-bold text-[#0f4a51] p-2 justify-center items-center">
                    Sorry! No Coupons Available at the moment.
                    <TbMoodSadSquint size="2rem" />
                  </div>
                ) : (
                  availableCoupons.map((coupon) => (
                    <div key={coupon.id} className="text-center p-1">
                      <StarRateRoundedIcon
                        style={{ color: "#fde047", fontSize: "1.2rem" }}
                      />
                      <span className="text-sm">{coupon.description} - </span>
                      <span className="text-[#0f4a51] font-bold cursor-pointer hover:opacity-80 text-sm">
                        {coupon.couponCode}{" "}
                      </span>
                      <StarRateRoundedIcon
                        style={{ color: "#fde047", fontSize: "1.2rem" }}
                      />
                    </div>
                  ))
                )}
                <small className="mt-1 font-medium block text-center text-gray-500">
                  **Note:** Add them during the checkout
                </small>
              </div>
            </div>

            {/* 2. Cart Items List */}
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 p-4">
                  <div className="shrink-0">
                    <img
                      className="h-20 w-20 object-cover rounded-lg cursor-pointer border border-gray-100"
                      src={item.imgSrc}
                      alt="product-icon"
                      onClick={() => {
                        navigate(
                          `/products/${item.category}/${item.productName}`
                        );
                        handleOpenCart();
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <Link
                        className="font-semibold text-gray-800 hover:!text-[#0f4a51] text-base line-clamp-2"
                        to={`/products/${item.category}/${item.productName}`}
                        onClick={handleOpenCart}
                      >
                        {item.productName}
                      </Link>
                      <p className="text-gray-800 font-bold text-lg ml-2 shrink-0">
                        {INRCurrency(getTotalForItem(item))}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <HandleQuantity
                        item={item}
                        handleItemDecrease={() => handleItemDecrease(item)}
                        handleItemIncrease={() => handleItemIncrease(item)}
                        handleItemRemove={() => handleItemRemove(item.id)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* 3. Upsell Section (BuyMoreProducts) */}
            <div className="mt-2 p-4 border-t border-gray-200">
              <BuyMoreProducts
                showCarousel={false}
                handleOpenCart={handleOpenCart}
                productCategory=""
              />
            </div>
          </div>
        )}

        {/* 4. Sticky Checkout Footer */}
        {cartItems?.length > 0 && (
          <div className="sticky bottom-0 shadow-2xl p-4 bg-white z-20 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-700 font-medium text-lg">
                Subtotal ({cartItems?.length}{" "}
                {cartItems?.length === 1 ? "item" : "items"})
              </p>
              <p className="text-2xl font-bold text-[#0f4a51]">
                {INRCurrency(totalCartValue)}
              </p>
            </div>
            {/* Using the branded button for the primary CTA */}
            <BrandedButton
              label="Proceed to Checkout"
              onClick={handleCartSubmit}
              startIcon={
                <MdOutlineShoppingCartCheckout
                  size="1.5rem"
                  className="mr-1 group-hover:scale-110 transition duration-300"
                />
              }
            />
          </div>
        )}
      </div>

      {removeItem && (
        <ConfirmationModal
          isEmptyCart={isEmptyCart}
          title={removeMessage}
          handleCancel={handleCancel}
          handlePrimaryButtonClick={confirmRemove}
          confirmButtonText={isEmptyCart ? "Empty" : "Remove"}
        />
      )}
    </DrawerComponent>
  );
}

export default CartDrawer;
