import { Card, CardContent } from "@mui/material";
import CustomButton from "../CustomButton";
import { useRef, useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function CustomSection({ items, cardClassName = "", titleClasses = "" }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkForScroll();
  }, [items]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-4 md:mb-8 !font-poppins relative">
      {/* Scroll Arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white cursor-pointer p-2 rounded-full shadow-md"
        >
          <HiChevronLeft size={30} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white cursor-pointer p-2 rounded-full shadow-md"
        >
          <HiChevronRight size={30} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkForScroll}
        className="flex gap-6 py-2 overflow-x-auto no-scrollbar px-2 lg:!px-10"
      >
        {items?.length > 0 &&
          items?.map((item, index) => (
            <Card
              key={index}
              className="!rounded-none !bg-transparent !shadow-none !shrink-0 md:!aspect-auto !min-w-[50vw] !max-w-[50vw] md:!min-w-[25%] md:!max-w-[25%] !cursor-pointer group hover:!shadow-md"
            >
              <CardContent className="!p-0 !bg-transparent overflow-hidden flex flex-col hover:!shadow-md">
                <div
                  className={`relative !rounded-t-lg overflow-hidden aspect-[2/1] h-36 md:!h-full md:!min-h-[40vh] bg-gray-100 flex items-center justify-center ${cardClassName}`}
                >
                  <div>
                    {item.thumbnailUrl || item?.documentUrl || item.image ? (
                      <div className="w-full h-full aspect-[2/1] md:!aspect-auto hover:!shadow-md">
                        <img
                          src={
                            item.thumbnailUrl || item?.documentUrl || item.image
                          }
                          alt={item.title}
                          className="w-full h-full object-cover absolute inset-0"
                          style={{ minHeight: "100%", minWidth: "100%" }}
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 flex items-center justify-center w-full h-full absolute inset-0">
                        No Preview
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black opacity-20 pointer-events-none rounded-t-lg" />
                  {item?.subText && (
                    <div className="absolute top-2 right-2 bg-[#0f4a51] border-[#0f4a51] text-white text-xs font-normal px-2 py-1 rounded-full z-10">
                      {item.subText?.charAt(0).toUpperCase()}
                      {item.subText?.slice(1)}
                    </div>
                  )}
                </div>

                <div className="border border-black/10 flex flex-col !rounded-b-lg p-4">
                  {item?.title && (
                    <h3
                      className={`text-lg font-medium text-sealBrown line-clamp-1 mb-2 ${titleClasses}`}
                    >
                      {item.title}
                    </h3>
                  )}
                  {item?.description && (
                    <p className="text-xs font-normal !text-gray-500 line-clamp-2 hidden group-hover:block py-2">
                      {item.description}
                    </p>
                  )}
                  <CustomButton
                    label="Shop Now"
                    variant="outlined"
                    className="!rounded-3xl !hidden group-hover:!block w-1/2 !px-3 !py-2 !text-sm !h-10"
                    onClick={() => navigate(item.link)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        {items?.length === 0 && (
          <div className="text-gray-400">No Data Found</div>
        )}
      </div>
    </div>
  );
}

export default CustomSection;
