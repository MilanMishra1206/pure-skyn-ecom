import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { Box, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import {
  updateQuantity,
  removeFromCart,
  addToCart,
} from "../../../../redux/Actions";
import { useAppSnackbar } from "../../../../config/Context/SnackbarContext";
import { INRCurrency } from "../../../../helpers/Regex";
import CustomButton from "../../../../shared/CustomButton";
import HandleQuantity from "../../../ProductsCart/HandleQuantity";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSnackbar = useAppSnackbar();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems?.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleItemIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleItemDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleItemRemove = (productId) => {
    dispatch(removeFromCart(productId));
    showSnackbar("Product Removed from Cart", "info");
  };

  const handleAddToCart = () => {
    if (isInCart) {
      handleItemIncrease(cartItem);
    } else {
      dispatch(addToCart(product));
      showSnackbar("Product Added to Cart", "success");
    }
  };

  return (
    <Card style={{ width: "inherit" }} className="p-4 shadow rounded-2xl m-2 border border-gray-100">
      <div className="flex items-center justify-center p-2">
        <img
          src={product.imgSrc}
          className="cursor-pointer h-64 rounded-md"
          onClick={() =>
            navigate(`/products/${product.category}/${product.productName}`)
          }
          alt={product.productName}
        />
      </div>
      <div className="flex flex-col p-3">
        <Card.Title className="h-10">
          <Link
            className="font-bold text-coal hover:text-[#0f4a51] no-underline"
            to={`/products/${product.category}/${product.productName}`}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
            }}
          >
            {product.productName}
          </Link>
        </Card.Title>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Rating
            name="text-feedback"
            value={product.ratings}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Box sx={{ ml: 2 }}>{product.ratings}</Box>
        </Box>
        <Card.Text
          className="text-sm !text-kashmirBlue !cursor-default mt-4"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
          }}
        >
          {product.productDescription}
        </Card.Text>
        <Link
          className="text-xs underline !text-[#0f4a51] hover:!opacity-80"
          to={`/products//${product.category}/${product.productName}`}
        >
          Read More
        </Link>
        <div className="flex">
          {product.strikePrice && (
            <span className="mt-4 text-left text-slate-400 line-through font-bold mr-4">
              {INRCurrency(product.strikePrice)}
            </span>
          )}
          <span className="mt-4 text-left text-[#0f4a51] font-bold mb-4">
            ₹{product.productPrice}
          </span>
        </div>
        <div className="mt-4">
          {isInCart ? (
            <HandleQuantity
              item={cartItem}
              handleItemIncrease={() => handleItemIncrease(cartItem)}
              handleItemDecrease={() => handleItemDecrease(cartItem)}
              handleItemRemove={() => handleItemRemove(cartItem.id)}
              isNotCartDrawer
            />
          ) : (
            <CustomButton
              label="Add to Cart"
              startIcon={<FaCartPlus size="1.5rem" />}
              onClick={handleAddToCart}
              className="!rounded-2xl w-full !bg-[#15676e] hover:!bg-white hover:!text-[#15676e] hover:!border duration-500"
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
