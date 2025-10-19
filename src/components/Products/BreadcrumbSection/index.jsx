import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toTitleCase } from "../../../helpers/Common";

const BreadcrumbSection = ({ category }) => {
  return (
    <div className="mb-4 py-4 font-poppins">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <Link
          to="/"
          className="text-[#0f4a51] no-underline font-poppins hover:opacity-80 text-lg"
        >
          Home
        </Link>
        {category && (
          <Link
            to="/products"
            className="text-[#0f4a51] no-underline font-poppins hover:opacity-80 text-lg"
          >
            Products
          </Link>
        )}
        {category && (
          <Typography className="!text-coal !font-poppins !text-lg">
            {toTitleCase(category)}
          </Typography>
        )}
        {!category && (
          <Typography className="!text-coal !font-poppins !text-lg">
            Products
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbSection;
