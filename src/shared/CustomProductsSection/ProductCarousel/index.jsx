import React, { useRef } from "react";
import ProductCard from "../ProductCard";

function ProductCarousel({ products }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        className="absolute left-0 z-10 p-2 text-gray-500 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f4a51]"
        onClick={scrollLeft}
      >
        &lt;
      </button>

      <div className="flex-1 overflow-x-hidden">
        <div
          className="flex gap-6 overflow-x-scroll pb-4 hide-scrollbar"
          ref={carouselRef}
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <button
        className="absolute right-0 z-10 p-2 text-gray-500 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f4a51]"
        onClick={scrollRight}
      >
        &gt;
      </button>
    </div>
  );
}

export default ProductCarousel;