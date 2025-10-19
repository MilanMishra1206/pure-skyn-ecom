import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Resources from "../../config/Resources";
import FadeInWrapper from "../../config/MotionFramer/FadeInWrapper";
import { TbMoodSadSquint } from "react-icons/tb";
import { FaCartPlus } from "react-icons/fa";
import CustomButton from "../../shared/CustomButton";

function CartDrawer({ onClose }) {
  const navigate = useNavigate();
  const availableCoupons = [
    {
      id: 1,
      couponCode: "PS30",
      description: "30% off on the cart value",
      priceOff: 30,
      productsFree: 0,
    },
    {
      id: 2,
      couponCode: "PS40",
      description: "40% off on the cart value",
      percentOff: 40,
      productsFree: 0,
    },
  ];

  const cartItems = [];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center px-2 h-[70px] border-b border-black/10">
        <p className="text-xl font-bold text-[#0f4a51]">Cart</p>
        <button
          className="text-2xl text-[#0f4a51] cursor-pointer"
          onClick={onClose}
        >
          <HiX />
        </button>
      </div>
      <motion.div
        variants={FadeInWrapper("left", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div>
          {cartItems?.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-2 md:!px-5 pb-5">
              <img
                src={Resources.images.cart.emptyCart}
                className="h-36"
                alt="empty cart"
              />
              <p className="text-xl font-bold text-center text-coal mb-10">
                Your cart is empty. Let's add some items! ⚡
              </p>
              <CustomButton
                label="Continue Shopping"
                startIcon={<FaCartPlus size="1.2rem" />}
                className="!rounded-3xl !bg-[#0f4a51]"
                onClick={() => {
                  navigate("/products");
                  onClose();
                }}
              />
            </div>
          ) : (
            <>
              <div className="mt-4">
                <div className="bg-slate-50 text-coal shadow text-center py-3">
                  <p className="font-bold text-xl underline">
                    Available Coupons
                  </p>
                  {availableCoupons.length === 0 ? (
                    <div className="flex font-bold text-[#0f4a51] p-2">
                      Sorry! No Coupons Available at the moment.
                      <TbMoodSadSquint size="2rem" />
                    </div>
                  ) : (
                    availableCoupons.map((coupon) => (
                      <div
                        key={coupon.id}
                        className="bg-body-secondary p-1 border-b-2"
                      >
                        <StarRateRoundedIcon
                          style={{ color: "#fde047", fontSize: "1.6rem" }}
                        />
                        <span key={coupon.id}>{coupon.description} - </span>
                        <span className="text-[#0f4a51] font-bold cursor-pointer hover:opacity-80">
                          {coupon.couponCode}{" "}
                        </span>
                        <StarRateRoundedIcon
                          style={{ color: "#fde047", fontSize: "1.6rem" }}
                        />
                      </div>
                    ))
                  )}
                  <small className="mt-4 font-medium">
                    <strong>Note: </strong>Add them during the checkout
                  </small>
                </div>
              </div>
            </>
          )}
          {/* <motion.div
              variants={FadeInWrapper("left", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <BuyMoreProducts
                showCarousel={false}
                handleOpenCart={handleOpenCart}
                productCategory=""
              />
            </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
}

export default CartDrawer;
