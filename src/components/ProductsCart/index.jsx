/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect, useState, useMemo } from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { TbMoodSadSquint } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { Breadcrumbs, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import FadeInWrapper from "../../config/MotionFramer/FadeInWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useAppSnackbar } from "../../config/Context/SnackbarContext";
import { emptyCart, removeFromCart, updateQuantity } from "../../redux/Actions";
import { INRCurrency } from "../../helpers/Regex";
import Resources from "../../config/Resources";
import HandleQuantity from "./HandleQuantity";
import BuyMoreProducts from "../Products/ProductsDetails/BuyMoreProducts";
import ConfirmationModal from "./ConfirmationModal";

const CustomTextField = lazy(() => import("../../shared/CustomTextField"));

const SHIPPING_THRESHOLD = 500;
const ORIGINAL_SHIPPING_CHARGES = 149;
const PRIMARY_COLOR = "#0f4a51";
const SECONDARY_COLOR = "#15676e";

const BrandedButton = ({ label, onClick, startIcon, className = "" }) => (
  <button
    onClick={onClick}
    className={`group flex items-center cursor-pointer justify-center rounded-lg font-medium py-3 px-4 transition duration-300 w-full 
      bg-[${PRIMARY_COLOR}] text-white hover:bg-[${SECONDARY_COLOR}] active:bg-[${PRIMARY_COLOR}] ${className}`}
  >
    {startIcon}
    <span className="ml-2">{label}</span>
  </button>
);

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSnackbar = useAppSnackbar();

  const isMobile = useMediaQuery("(max-width: 767px)");

  const [productId, setProductId] = useState("");
  const [removeItem, setRemoveItem] = useState(false);
  const [removeMessage, setRemoveMessage] = useState("");
  const [isEmptyCart, setIsEmptyCart] = useState(false);

  const [couponCodeName, setCouponCodeName] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [showMinValueMessage, setShowMinValueMessage] = useState("");

  const cartItems = useSelector((state) => state.cart.items);

  const getTotalForItem = (item) => item.quantity * +item.productPrice;

  const originalCartValue = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + getTotalForItem(item), 0);
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

  const shippingCharges = useMemo(() => {
    return originalCartValue >= SHIPPING_THRESHOLD
      ? 0
      : ORIGINAL_SHIPPING_CHARGES;
  }, [originalCartValue]);

  const grandTotal = originalCartValue - couponDiscount + shippingCharges;

  const handleCartSubmit = () => {
    navigate("/checkout");
  };

  const handleItemIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleItemDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleEmptyCart = () => {
    setRemoveItem(true);
    setRemoveMessage(
      "Are you sure you want to empty your cart? You will miss out on great offers!"
    );
    setIsEmptyCart(true);
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

  const handleCouponApply = (code) => {
    const couponDetails = availableCoupons.find(
      (item) => item.couponCode === code
    );

    // 1. Check if a code was entered
    if (!code?.trim()) {
      handleRemoveCoupon();
      return;
    }

    // 2. Check minimum value threshold
    if (originalCartValue < SHIPPING_THRESHOLD) {
      setShowMinValueMessage(
        `Minimum cart value must be ${INRCurrency(
          SHIPPING_THRESHOLD
        )} to apply a coupon.`
      );
      setIsCouponApplied(false);
      setCouponDiscount(0);
      return;
    }

    // 3. Check if coupon exists and apply discount
    if (couponDetails) {
      const discountPercentage = couponDetails.percentOff;
      const amountSaved = (originalCartValue * discountPercentage) / 100;

      setCouponDiscount(amountSaved);
      setIsCouponApplied(true);
      setCouponCodeName(code);
      setShowMinValueMessage("");
      showSnackbar(`Great! You saved ${INRCurrency(amountSaved)}!`, "success");
    } else {
      // 4. Coupon not found
      setShowMinValueMessage("No such coupon available. Please try again!");
      setIsCouponApplied(false);
      setCouponDiscount(0);
    }
  };

  const handleCouponClick = (selectedCouponCode) => {
    setCouponCodeName(selectedCouponCode);
    handleCouponApply(selectedCouponCode);
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCouponCodeName("");
    setCouponDiscount(0);
    setShowMinValueMessage("");
    showSnackbar("Coupon removed.", "info");
  };

  useEffect(() => {
    if (isCouponApplied && originalCartValue < SHIPPING_THRESHOLD) {
      handleRemoveCoupon();
      setShowMinValueMessage(
        `Coupon removed. Min value of ${INRCurrency(
          SHIPPING_THRESHOLD
        )} required.`
      );
    }
  }, [originalCartValue, isCouponApplied]);

  const freeDeliveryMessage =
    originalCartValue >= SHIPPING_THRESHOLD
      ? `CONGRATS! You get FREE SHIPPING 🎉🎉`
      : `Only ${INRCurrency(
          SHIPPING_THRESHOLD - originalCartValue
        )} away from FREE SHIPPING!`;

  const breadcrumbs = [
    <Link
      key="1"
      to="/"
      className={`text-[${PRIMARY_COLOR}] no-underline font-poppins hover:opacity-80 text-sm`}
    >
      Home
    </Link>,
    <button
      key="2"
      onClick={() => {
        window.location.href = "/products";
      }}
      className={`bg-transparent border-none p-0 cursor-pointer text-[${PRIMARY_COLOR}] no-underline font-poppins hover:opacity-80 text-sm`}
    >
      Shop
    </button>,
    <Typography key="3" className="!text-gray-600 !font-poppins !text-sm">
      Cart
    </Typography>,
  ];

  return (
    <motion.div
      variants={FadeInWrapper("left", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-5 lg:px-10 pb-10"
    >
      <div className="px-4 mb-6">
        <Breadcrumbs
          separator={<MdKeyboardDoubleArrowRight />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>

      {cartItems?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-5">
          <img
            src={Resources.images.cart.emptyCart}
            className="max-h-72"
            alt="empty cart"
          />
          <p className="text-2xl font-bold text-center mt-6 text-gray-800">
            Your cart is empty. Let's add some items! ⚡
          </p>
          <BrandedButton
            label="Continue Shopping"
            startIcon={<FaCartPlus size="1.2rem" />}
            onClick={() => navigate("/products")}
            className="mt-6 !w-auto px-8"
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Your Cart ({cartItems.length} items)
            </h1>
            <Link
              to={"/products"}
              className={`flex items-center text-[${PRIMARY_COLOR}] hover:opacity-80 font-semibold no-underline text-base`}
            >
              Continue Shopping
              <MdKeyboardDoubleArrowRight
                className={`text-xl text-[${PRIMARY_COLOR}]`}
              />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-4">
            <div className="lg:w-3/5 xl:w-7/12 rounded-xl shadow-lg p-3 sm:p-6">
              <ul className="divide-y divide-gray-200">
                {cartItems?.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 py-4 sm:py-6"
                  >
                    <div className="shrink-0">
                      <img
                        className="h-28 w-28 object-cover rounded-lg cursor-pointer border border-gray-100"
                        src={item.imgSrc}
                        alt="product-icon"
                        onClick={() =>
                          navigate(`/products/${item.productName}`)
                        }
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-full sm:w-3/5 pr-4">
                          <Link
                            className={`no-underline text-base font-semibold text-gray-800 cursor-pointer hover:!text-[${PRIMARY_COLOR}] line-clamp-2`}
                            to={`/products/${item.productName}`}
                          >
                            {item.productName}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.productDescription}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="shrink-0 text-lg font-bold text-gray-900">
                            {INRCurrency(getTotalForItem(item))}
                          </p>
                          <HandleQuantity
                            item={item}
                            handleItemDecrease={() => handleItemDecrease(item)}
                            handleItemIncrease={() => handleItemIncrease(item)}
                            handleItemRemove={() => handleItemRemove(item.id)}
                          />
                        </div>
                      </div>

                      {isMobile && (
                        <button
                          onClick={() => handleItemRemove(item.id)}
                          className="text-sm text-red-500 font-medium hover:text-red-700 mt-2 self-start"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end pt-4 border-t mt-4">
                <button
                  className="flex items-center cursor-pointer gap-1 px-4 py-2 text-sm font-bold rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200"
                  onClick={handleEmptyCart}
                >
                  <MdDeleteForever size="1.2rem" />
                  Empty Cart
                </button>
              </div>
            </div>

            <div className="lg:w-2/5 xl:w-5/12">
              <div className="flex flex-col rounded-xl shadow-lg p-5 sticky top-4 bg-white">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div
                  className={`p-3 text-sm text-center font-bold rounded-lg mb-4 text-white ${
                    originalCartValue >= SHIPPING_THRESHOLD
                      ? `bg-[${PRIMARY_COLOR}]`
                      : `bg-gray-500`
                  }`}
                >
                  {freeDeliveryMessage}
                </div>

                <div className="border rounded-lg p-3 mb-4 bg-gray-50">
                  <p
                    className={`font-bold text-base text-center mb-3 text-[${PRIMARY_COLOR}]`}
                  >
                    Available Coupons
                  </p>
                  <div className="space-y-2">
                    {availableCoupons.length === 0 ? (
                      <div
                        className={`flex font-bold text-[${PRIMARY_COLOR}] text-sm p-1 justify-center items-center`}
                      >
                        Sorry! No Coupons Available.
                        <TbMoodSadSquint size="1.5rem" className="ml-1" />
                      </div>
                    ) : (
                      availableCoupons.map((coupon) => (
                        <div
                          key={coupon.id}
                          className="text-sm p-1 rounded border border-dashed border-gray-300"
                        >
                          <StarRateRoundedIcon
                            style={{ color: "#fde047", fontSize: "1rem" }}
                          />
                          <span className="ml-1">{coupon.description} - </span>
                          <button
                            className={`text-[${PRIMARY_COLOR}] font-bold cursor-pointer hover:opacity-80 transition duration-150 ${
                              couponCodeName === coupon.couponCode
                                ? "underline"
                                : ""
                            }`}
                            onClick={() =>
                              handleCouponClick(coupon?.couponCode)
                            }
                          >
                            {coupon.couponCode}
                          </button>
                        </div>
                      ))
                    )}
                    {availableCoupons.length > 1 && (
                      <small className="block text-center text-gray-500 text-xs mt-1">
                        * You cannot club multiple coupons.
                      </small>
                    )}
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">
                      Subtotal ({cartItems.length} items)
                    </p>
                    <p className="text-base font-semibold text-gray-800">
                      {INRCurrency(originalCartValue)}
                    </p>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="text-green-600 font-medium">
                        Coupon Discount
                      </p>
                      <p className="text-base font-semibold text-green-600">
                        - {INRCurrency(couponDiscount)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Shipping Charges</p>
                    {shippingCharges === 0 ? (
                      <div className="flex gap-1 items-center">
                        <span className="text-sm text-slate-400 line-through mr-2">
                          {INRCurrency(ORIGINAL_SHIPPING_CHARGES)}
                        </span>
                        <span className="text-base font-semibold text-green-600">
                          FREE
                        </span>
                      </div>
                    ) : (
                      <span className="text-base font-semibold text-gray-800">
                        {INRCurrency(shippingCharges)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  {isCouponApplied ? (
                    <div className="p-3 bg-green-50 rounded font-bold my-2 border border-green-300">
                      <div className="flex justify-between items-center mb-2">
                        <p
                          className={`flex text-green-700 items-center gap-2 text-sm`}
                        >
                          <FaCircleCheck size="0.9rem" /> {couponCodeName}{" "}
                          Applied
                        </p>
                        <button
                          className="text-red-500 text-xs cursor-pointer underline hover:opacity-80 transition duration-150"
                          onClick={handleRemoveCoupon}
                        >
                          Remove
                        </button>
                      </div>
                      <span className="text-sm text-green-700">
                        You saved {INRCurrency(couponDiscount)}!
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <Suspense fallback={<div />}>
                        <CustomTextField
                          placeholder="Enter coupon code here"
                          labelToShow="Have a coupon?"
                          name="coupon"
                          value={couponCodeName}
                          onChange={(e) => setCouponCodeName(e.target.value)}
                          textFieldColorClass="shadow-insetLight"
                          inputClassName="!bg-transparent"
                          fieldWidth="!mb-0"
                          textClassOverride="!text-gray-700"
                        />
                      </Suspense>
                      <button
                        onClick={() => handleCouponApply(couponCodeName)}
                        className={`mt-2 px-4 py-2 text-sm text-white rounded cursor-pointer focus:outline-none transition duration-300 w-full font-semibold ${
                          couponCodeName.trim()
                            ? `bg-[${PRIMARY_COLOR}] hover:bg-[${SECONDARY_COLOR}]`
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!couponCodeName.trim()}
                      >
                        Apply Coupon
                      </button>
                      {showMinValueMessage && (
                        <small className="text-sm text-red-500 block mt-2">
                          {showMinValueMessage}
                        </small>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dashed pt-4">
                  <p className="font-bold text-xl text-gray-700">Order Total</p>
                  <p className={`text-3xl font-bold text-[${PRIMARY_COLOR}]`}>
                    {INRCurrency(grandTotal)}
                  </p>
                </div>

                <div className="mt-6">
                  <BrandedButton
                    label="Proceed to Checkout"
                    onClick={handleCartSubmit}
                    startIcon={
                      <MdOutlineShoppingCartCheckout
                        size="1.5rem"
                        className="mr-2 group-hover:scale-110 transition duration-300"
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <motion.div
        variants={FadeInWrapper("up", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-12 px-4"
      >
        <BuyMoreProducts productCategory="" />
      </motion.div>

      {removeItem && (
        <ConfirmationModal
          isEmptyCart={isEmptyCart}
          title={removeMessage}
          handleCancel={handleCancel}
          handlePrimaryButtonClick={confirmRemove}
          confirmButtonText={isEmptyCart ? "Empty" : "Remove"}
        />
      )}
    </motion.div>
  );
}

export default Cart;
