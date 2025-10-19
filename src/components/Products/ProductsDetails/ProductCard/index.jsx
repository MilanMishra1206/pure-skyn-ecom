import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { Box, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useAppSnackbar } from "../../../../config/Context/SnackbarContext";
import { addToCart } from "../../../../redux/Actions";
import { INRCurrency } from "../../../../helpers/Regex";
import CustomButton from "../../../../shared/CustomButton";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showSnackbar = useAppSnackbar();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showSnackbar("Product Added to Cart", "success");
  };

  return (
    <Card style={{ width: "inherit" }}>
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
        <CustomButton
          label="Add to Cart"
          startIcon={<FaCartPlus size="1.5rem" />}
          onClick={handleAddToCart}
          className="!rounded-2xl !bg-[#15676e] hover:!bg-white hover:!text-[#15676e] hover:!border duration-500"
        />
      </div>
    </Card>
  );
}

export default ProductCard;
