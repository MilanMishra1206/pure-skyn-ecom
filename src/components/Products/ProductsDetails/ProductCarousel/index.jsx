import React from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard";
import { useMediaQuery } from "@mui/material";

function ProductCarousel({ carouselContent }) {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: isMobile ? 1 : 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="p-4 w-auto my-4">
      <div className="flex flex-col md:!flex-row md:gap-2 justify-center mb-4">
        <p className="font-bold text-2xl text-center">Browse Products</p>
      </div>
      <Slider {...settings}>
        {carouselContent.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel;
