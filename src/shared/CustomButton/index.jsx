import { Button } from "@mui/material";
import React, { memo } from "react";

function CustomButton({
  className = "!px-6",
  label,
  bgColour = "bg-[#045CA8] text-white",
  variant = "contained",
  startIcon,
  color = "primary",
  onClick,
  disabled = false,
  img = { imgSrc: "", imgAlt: "" },
  imgClass = "",
  title = "",
}) {
  const baseStyles =
    "!font-poppins h-12 mb-30 text-[13px] font-medium rounded-lg !capitalize";

  const containedStyle = variant === "contained" ? bgColour : "";

  return (
    <Button
      type="button"
      variant={variant}
      color={color}
      title={title}
      className={`${className} ${baseStyles} ${containedStyle}`}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      tabIndex={0}
    >
      {img?.imgSrc && (
        <img
          src={img?.imgSrc}
          alt={img?.imgAlt}
          className={`mr-2 ${imgClass} ${
            disabled ? "opacity-40" : "opacity-100"
          }`}
        />
      )}{" "}
      {label}
    </Button>
  );
}

export default memo(CustomButton);
