import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useMediaQuery } from "@mui/material";

function ProductCarousel({ products }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Use media queries for a basic estimate of minimum required products
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const minProductsForScroll = isDesktop ? 4 : 2;

  // Primary brand colors for focus ring
  const PRIMARY_COLOR = "#0f4a51";
  const SECONDARY_COLOR = "#15676e";

  const scrollAmount = isDesktop ? 900 : 300; // Scroll by more on desktop

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

  // Logic to determine if scrolling is needed or possible (for arrow visibility)
  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      // Determine if scrolling is possible
      const needsScroll = scrollWidth > clientWidth;

      // Can scroll left if not at the beginning (using a small tolerance)
      setCanScrollLeft(scrollLeft > 5);

      // Can scroll right if there is content hidden to the right (using a small tolerance)
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
      window.addEventListener("resize", checkScroll); // Check on resize
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]); // Re-run effect if product list changes

  // Basic check to hide arrows if the product count is clearly too low
  const shouldShowArrows = products.length >= minProductsForScroll;

  const arrowBaseClasses = `absolute z-20 p-3 text-white rounded-full shadow-lg transition-all 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${PRIMARY_COLOR}]`;

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
        className="flex gap-6 overflow-x-scroll pb-4 hide-scrollbar px-6"
        ref={carouselRef}
        onScroll={checkScroll}
      >
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSingleProduct={products?.length === 1}
          />
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
