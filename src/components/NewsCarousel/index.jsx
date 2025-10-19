import React, { useRef, useEffect, useState } from "react";
import { newsLogos } from "../../helpers/dummyData";

function NewsCarousel() {
  const carouselRef = useRef(null);
  const [clonedLogos, setClonedLogos] = useState([]);

  // Duplicate logos to create an infinite loop effect
  useEffect(() => {
    if (newsLogos.length > 0) {
      // Duplicate enough times to fill the visible area and allow smooth looping
      const numClones = 3; // Adjust as needed based on how many logos fit on screen
      const clones = Array(numClones).fill(newsLogos).flat();
      setClonedLogos([...newsLogos, ...clones, ...newsLogos]);
    }
  }, []);

  const scrollAmount = 250; // Adjust scroll distance as needed

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

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">
          We're in the News
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 p-2 transform -translate-x-1/2 rounded-full cursor-pointer text-[#15676e] focus:outline-none focus:ring-2 focus:ring-[#15676e]"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden scroll-smooth whitespace-nowrap hide-scrollbar py-4"
            // You might add dynamic width here if needed based on logos
          >
            {clonedLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-6">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 p-2 transform translate-x-1/2 rounded-full cursor-pointer text-[#15676e] focus:outline-none focus:ring-2 focus:ring-[#15676e]"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsCarousel;
