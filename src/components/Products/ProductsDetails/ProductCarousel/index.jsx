import React from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard";

function ProductCarousel({ carouselContent }) {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
        },
      },
      {
        breakpoint: 1101,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 881,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 4,
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
