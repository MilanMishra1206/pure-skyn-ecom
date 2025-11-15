import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useMediaQuery } from "@mui/material";

function ProductCarousel({ products }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const minProductsForScroll = isDesktop ? 4 : 2;
  const PRIMARY_COLOR = "#0f4a51";
  const SECONDARY_COLOR = "#15676e";

  const scrollAmount = isDesktop ? 900 : 300;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      const needsScroll = scrollWidth > clientWidth;

      setCanScrollLeft(scrollLeft > 5);

      setCanScrollRight(
        needsScroll && scrollLeft < scrollWidth - clientWidth - 5
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const shouldShowArrows = products.length >= minProductsForScroll;

  const arrowBaseClasses = `absolute z-30 p-2 text-white rounded-full shadow-md transition-all 
                          focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-700 hover:bg-gray-800`;

  return (
    <div className="relative w-full">
      {(canScrollLeft || !shouldShowArrows) && shouldShowArrows && (
        <button
          className={`${arrowBaseClasses} left-0 top-1/2 transform -translate-y-1/2 bg-[${PRIMARY_COLOR}] hover:!bg-[${SECONDARY_COLOR}] cursor-pointer`}
          onClick={scrollLeft}
        >
          &lt;
        </button>
      )}

      <div
        className="flex gap-4 overflow-x-scroll pb-4 hide-scrollbar snap-x"
        ref={carouselRef}
        onScroll={checkScroll}
      >
        {products?.map((product) => (
          <div key={product.id} className="flex-shrink-0">
            <ProductCard
              product={product}
              isSingleProduct={products?.length === 1}
            />
          </div>
        ))}
      </div>

      {canScrollRight && shouldShowArrows && (
        <button
          className={`${arrowBaseClasses} right-0 top-1/2 transform -translate-y-1/2 bg-[${PRIMARY_COLOR}] hover:!bg-[${SECONDARY_COLOR}] cursor-pointer`}
          onClick={scrollRight}
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default ProductCarousel;
