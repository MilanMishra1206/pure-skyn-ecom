import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdVerified } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";

import { ProductReviews } from "./ProductReviews";
import BuyMoreProducts from "./BuyMoreProducts";
import FadeInWrapper from "../../../config/MotionFramer/FadeInWrapper";
import { regex, INRCurrency } from "../../../helpers/Regex";
import CustomTextField from "../../../shared/CustomTextField";
import CustomAutocomplete from "../../../shared/CustomAutocomplete";
import { useAppSnackbar } from "../../../config/Context/SnackbarContext";
import { addToCart } from "../../../redux/Actions";
import ProductDescriptionImage from "./ProductDescriptionImage";
import OffersCarousel from "./OffersCarousel";
import { reviewContent, toTitleCase } from "../../../helpers/Common";
import { getShippingDate, productList } from "../../../helpers/productsData";

const PRIMARY_COLOR = "#0f4a51";

function ProductsDetails() {
  const { category: urlCategory, productName } = useParams();
  const showSnackbar = useAppSnackbar();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isLargeScreen = useMediaQuery("(min-width: 1438px)");
  const [quantity, setQuantity] = useState("1");
  const [pinCode, setPinCode] = useState("");
  const [productDetail, setProductDetail] = useState(null);
  const [noOfRatings, setNoOfRatings] = useState(0);
  const [productSubCategory, setProductSubCategory] = useState("");
  const [actualProductCategory, setActualProductCategory] =
    useState(urlCategory);
  const [selectedItem, setSelectedItem] = useState(1);

  useEffect(() => {
    const decodedProductName = decodeURIComponent(productName);
    const foundProduct = productList.find(
      (p) => p.productName === decodedProductName
    );

    setProductDetail(foundProduct);
    setProductSubCategory(foundProduct ? foundProduct.subCategory : "");

    if (foundProduct) {
      // 2. Set SubCategory and the ACTUAL Category from the product object
      setProductSubCategory(foundProduct.subCategory);
      setActualProductCategory(foundProduct.category);

      if (foundProduct.productsAdditionalDetails?.length > 0) {
        setSelectedItem(foundProduct.productsAdditionalDetails[0].id);
      }
    }
  }, [productName]);

  useEffect(() => {
    setNoOfRatings(reviewContent.length);
  }, []);

  const calculateSaveAmount = (oldPrice, newPrice) => {
    const saveAmount = +oldPrice - +newPrice;
    return saveAmount > 0 ? `Save ${INRCurrency(saveAmount)}` : "";
  };

  const handleClick = (id) => {
    setSelectedItem(id);
  };

  const handlePincodeCheck = () => {
    if (pinCode.length === 6) {
      showSnackbar(`Checking delivery for ${pinCode}...`, "info");
    } else {
      showSnackbar("Please enter a valid 6-digit Pincode.", "error");
    }
  };

  const handleAddToCart = () => {
    if (!productDetail) return;
    const updatedProduct = {
      ...productDetail,
      quantity: Number(quantity),
    };

    dispatch(addToCart(updatedProduct));
    showSnackbar(`Added ${quantity} x ${productName} to cart!`, "success");
  };

  const breadcrumbs = [
    <Link
      key="1"
      to="/"
      className={`text-[${PRIMARY_COLOR}] font-poppins hover:opacity-80 text-sm`}
    >
      Home
    </Link>,
    <Link
      key="2"
      to="/products"
      className={`text-[${PRIMARY_COLOR}] !font-poppins hover:!opacity-80 text-sm`}
    >
      Shop
    </Link>,
    <Link
      key="3"
      to={`/products/${urlCategory}`}
      className={`text-[${PRIMARY_COLOR}] !font-poppins hover:!opacity-80 text-sm`}
    >
      {toTitleCase(urlCategory)}
    </Link>,
    <Typography key="4" className="!text-gray-600 !font-poppins !text-sm">
      {productName}
    </Typography>,
  ];

  if (!productDetail) {
    return (
      <div className="p-10 text-center text-gray-700">
        Loading product details...
      </div>
    );
  }

  return (
    <div>
      <motion.div
        variants={FadeInWrapper("left", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="p-2 mt-4 md:!p-6 lg:!p-10"
      >
        <div className={`mb-4 ${isMobile ? "" : "px-1"} font-poppins`}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" className="mb-6">
            {breadcrumbs}
          </Breadcrumbs>

          <div className="grid lg:grid-cols-2 gap-8 bg-white p-0 md:!p-4 rounded-xl shadow-2xl">
            <div className="flex flex-col">
              <ProductDescriptionImage
                productDetail={productDetail}
                defaultImage={productDetail?.imgSrc}
              />
              <div className="mt-8 p-6 shadow-md rounded-lg bg-gray-50 mx-4 md:mx-0">
                <p className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Why Buy From Us?
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCircleCheck
                      fill="#10B981"
                      size="1.5rem"
                      className="flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        100% Genuine Products
                      </p>
                      <p className="text-sm text-gray-500">
                        Sourced directly from authorized partners.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaShippingFast
                      fill="#EE6503"
                      size="1.5rem"
                      className="flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Fast & Secure Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Shipped within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaCircleCheck
                      fill={PRIMARY_COLOR}
                      size="1.5rem"
                      className="flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Easy Returns & Exchange
                      </p>
                      <p className="text-sm text-gray-500">
                        7-day hassle-free policy (T&Cs apply).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 ${isTablet ? "pt-0" : "ml-5"}`}>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {productName}
              </h1>

              <div className="flex flex-wrap gap-4 mt-2">
                {productDetail?.smallDescription?.map((desc) => (
                  <div key={desc.id} className="flex items-center gap-1">
                    <FaCircleCheck fill="#0f4a51" size="0.8rem" />
                    <p className="!font-poppins text-sm text-gray-700 font-medium">
                      {desc.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:items-center mt-4 border-b border-gray-100 pb-4">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="text-feedback"
                    value={productDetail?.ratings || 4}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 1, fontWeight: "bold" }}>
                    {productDetail?.ratings || 4}/5
                  </Box>
                </Box>
                <span className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <MdVerified size="1rem" fill={PRIMARY_COLOR} />
                  <span className="text-gray-500">({noOfRatings} reviews)</span>
                </span>
              </div>

              <div className="flex md:!items-start lg:!items-center flex-col md:!flex-row gap-4 mt-4">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-3">
                    {productDetail?.strikePrice && (
                      <span className="text-base text-slate-400 line-through font-medium">
                        {INRCurrency(productDetail?.strikePrice)}
                      </span>
                    )}
                    <span className="text-4xl text-left font-extrabold text-[#0f4a51]">
                      {INRCurrency(productDetail?.productPrice)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {"(incl. of all taxes.)"}
                  </span>
                </div>
                {calculateSaveAmount(
                  productDetail?.strikePrice,
                  productDetail?.productPrice
                ) && (
                  <div className="rounded-full px-3 py-1 text-sm font-bold bg-[#15676e] text-white flex items-center justify-center shadow-md">
                    {calculateSaveAmount(
                      productDetail?.strikePrice,
                      productDetail?.productPrice
                    )}
                  </div>
                )}
              </div>

              <hr className="!my-6 border-gray-100" />

              <div className="grid sm:grid-cols-2 gap-4 place-items-center sm:place-items-start max-w-lg">
                <CustomAutocomplete
                  textClassOverride="!text-gray-700"
                  classes="!rounded-lg !mb-0 w-full"
                  requiredStar
                  labelToShow="Select Quantity"
                  name="quantity"
                  showIconOutline
                  options={Array.from({ length: 5 }, (_, i) => ({
                    label: `${i + 1}`,
                    value: `${i + 1}`,
                  }))}
                  value={quantity}
                  handleChange={(e) => setQuantity(e.target.value)}
                />

                <button
                  className={`!flex !items-center !justify-center gap-2 cursor-pointer w-full bg-[#0f4a51] !text-white py-3 px-4 rounded-lg font-semibold 
                            hover:!bg-[#15676e] focus:!outline-none focus:!ring-2 focus:!ring-[${PRIMARY_COLOR}] transition-all duration-300 shadow-lg 
                            max-w-xs sm:max-w-none`}
                  onClick={handleAddToCart}
                >
                  <FaCartPlus size="1.2rem" /> Add to Cart
                </button>
              </div>

              <div className="flex gap-3 place-items-center max-w-lg my-6">
                <CustomTextField
                  textClassOverride="!text-gray-700"
                  placeholderClasses="placeholder:!opacity-50 !text-gray-700"
                  className="h-12 rounded-lg !bg-white"
                  placeholder="Enter 6-digit Pincode"
                  labelToShow="Check Pincode"
                  maxLength={6}
                  regex={regex.numeric}
                  name="pinCode"
                  inputClassName="!bg-transparent"
                  fieldWidth="flex-grow"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <button
                  className={`!flex !items-center !justify-center gap-2 w-24 cursor-pointer bg-[#0f4a51] !text-white py-2 px-3 rounded-lg 
                             hover:!bg-[#15676e] transition-all duration-300 font-semibold h-12 shadow-md`}
                  onClick={handlePincodeCheck}
                >
                  Check
                </button>
              </div>

              <div className="flex flex-col md:!flex-row md:justify-between font-poppins my-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-gray-700 mb-2 md:mb-0">
                  <BsFillCartCheckFill fill="#15676e" size="1.4rem" />
                  <span className="text-base font-medium">
                    Recently in 12 carts
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaShippingFast fill="#EE6503" size="1.4rem" />
                  <span className="text-base font-medium">
                    Est. Delivery by{" "}
                    <span className="font-bold">{getShippingDate()}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col font-bold mb-5 mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-gray-800 mb-4">
                  <BiSolidOffer size="1.5rem" fill="#EE6503" />
                  <span className="text-xl font-semibold">
                    Special Offers & Coupons
                  </span>
                </div>
                <OffersCarousel />
              </div>
            </div>
          </div>

          <motion.div
            variants={FadeInWrapper("top", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 p-4 rounded-xl shadow-2xl bg-white"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
              Product Information
            </h2>

            {isLargeScreen && (
              <div>
                <ul className="flex justify-start gap-8 border-b-2 border-gray-200">
                  {productDetail?.productsAdditionalDetails?.map((item) => (
                    <li
                      key={item.id}
                      className="text-lg font-semibold cursor-pointer p-2 transition-all duration-200"
                      onClick={() => handleClick(item.id)}
                    >
                      <span
                        className={`p-2 border-b-4 ${
                          item.id === selectedItem
                            ? `!border-[${PRIMARY_COLOR}] text-[${PRIMARY_COLOR}]`
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
                {selectedItem && (
                  <div
                    className="p-4 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        productDetail?.productsAdditionalDetails?.find(
                          (item) => item.id === selectedItem
                        )?.content || "",
                    }}
                  />
                )}
              </div>
            )}

            {/* Mobile/Tablet Accordion View */}
            {!isLargeScreen && (
              <div className="mb-5">
                {productDetail?.productsAdditionalDetails?.map((item) => (
                  <Accordion
                    defaultExpanded={item.id === 1}
                    key={item.id}
                    className="shadow-md mb-2"
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className={`text-[${PRIMARY_COLOR}]`} />
                      }
                      aria-controls={`${item.id}-content`}
                      id={`${item.id}-header`}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                      <Typography
                        component="span"
                        className={`font-bold font-poppins text-[${PRIMARY_COLOR}]`}
                      >
                        {item.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        className="!font-poppins !text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </motion.div>

          {/* Related Products */}
          <motion.div
            variants={FadeInWrapper("left", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12"
          >
            <BuyMoreProducts
              showCarousel={true}
              productCategory={actualProductCategory}
              productSubCategory={productSubCategory}
            />
          </motion.div>

          <hr className="!my-12 border-gray-100" />

          {/* Product Reviews */}
          <motion.div
            variants={FadeInWrapper("right", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12"
          >
            <ProductReviews reviewContent={reviewContent} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductsDetails;
