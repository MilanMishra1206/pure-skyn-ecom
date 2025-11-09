import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Rating, LinearProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddReviewSection from "./AddReviewSection";

const PRIMARY_COLOR = "#0f4a51";
const SECONDARY_COLOR = "#15676e";

export const ProductReviews = ({ reviewContent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const reviewsPerPage = 6;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  const currentReviews = reviewContent.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(reviewContent.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const ratingArr = reviewContent.map((item) => item.rating);
    const sum = ratingArr.reduce((acc, num) => acc + num, 0);
    const average = sum / ratingArr.length;
    setAverageRating(average);
  }, [reviewContent]);

  // Ensure ratingCount is correctly sized for 1-5 stars
  const ratingCount = [0, 0, 0, 0, 0]; // Index 0 is 1 star, Index 4 is 5 stars

  reviewContent.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      // Use 5 - rating to calculate the index starting from 5 stars (index 0)
      ratingCount[review.rating - 1] += 1;
    }
  });

  const totalReviews = reviewContent.length;

  return (
    <div className="py-12 text-gray-700 bg-white"> {/* Changed background to white for consistency */}
      <div className="flex flex-col gap-4 md:!flex-row justify-between md:gap-2 px-1 md:!px-5 mb-8">
        <h2 className={`text-3xl font-extrabold text-[${PRIMARY_COLOR}] text-center md:text-left`}>
          Customer Reviews ({totalReviews})
        </h2>
        <AddReviewSection />
      </div>

      {/* --- Review Summary Section --- */}
      <div className="flex flex-col lg:!flex-row gap-8 px-1 md:!px-5 pb-8 border-b border-gray-100">
        
        {/* Left: Average Score */}
        <div className="flex items-center gap-4 flex-shrink-0 mb-4 lg:mb-0">
          <span className={`text-6xl text-[${PRIMARY_COLOR}] font-bold`}>
            {averageRating.toFixed(1)}
          </span>
          <div className="flex flex-col gap-1">
            <Box sx={{ width: 150 }}>
              <Rating
                name="average-feedback"
                value={+averageRating.toFixed(1)}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />}
              />
            </Box>
            <p className="text-gray-600 font-medium">
              Based on {totalReviews} verified reviews
            </p>
          </div>
        </div>

        {/* Right: Rating Bars (Reversed loop for 5-star first) */}
        <div className="flex-1 lg:ml-5">
          {[5, 4, 3, 2, 1].map((starValue) => {
            const index = starValue - 1;
            const count = ratingCount[index];
            const percentage = (count / (totalReviews || 1)) * 100;
            return (
              <div key={starValue} className="flex items-center gap-3 mb-1">
                <div className="flex items-center w-16 justify-end text-sm text-gray-700">
                    {starValue} <StarIcon style={{ color: PRIMARY_COLOR, fontSize: "1rem" }} />
                </div>
                <Box
                  sx={{
                    flexGrow: 1,
                    maxWidth: 200, // Constrain bar width on large screens
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 8, // Smaller bar height for cleaner look
                      borderRadius: 4,
                      backgroundColor: "#E0E0E0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: PRIMARY_COLOR, // Use Primary Brand Color
                      },
                      width: "100%",
                    }}
                  />
                </Box>
                <div className="text-gray-700 font-medium text-sm w-16 text-right">
                  <span>{count}</span> 
                  <span className="text-gray-500 ml-1">({percentage.toFixed(0)}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* --- Individual Reviews Grid --- */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid px-1 md:!px-5 pt-8 grid-flow-row md:!grid-cols-2 lg:!grid-cols-3 gap-6" // Cleaned up grid classes
      >
        {currentReviews.map((item) => (
          <div
            key={item.id}
            className="rounded-xl shadow-md p-5 bg-white transition-shadow hover:shadow-lg" // Used shadow-md, removed border
          >
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className={`bg-[${SECONDARY_COLOR}] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                        {item.name[0]}
                    </div>
                    <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                </div>
                <p className="text-gray-500 text-xs flex-shrink-0">{item.date}</p>
            </div>
            
            <Box sx={{ mb: 1 }}>
                <Rating
                  name={`review-${item.id}`}
                  value={item.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                  emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                />
            </Box>

            <p className="text-gray-700 text-sm italic">{item.review}</p>
          </div>
        ))}
      </motion.div>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              currentPage === 1 ? "bg-gray-100 text-gray-500 cursor-not-allowed" : `bg-[${PRIMARY_COLOR}] text-white hover:bg-[${SECONDARY_COLOR}]`
            }`}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === index + 1
                  ? `bg-[${PRIMARY_COLOR}] text-white shadow-md`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              currentPage === totalPages ? "bg-gray-100 text-gray-500 cursor-not-allowed" : `bg-[${PRIMARY_COLOR}] text-white hover:bg-[${SECONDARY_COLOR}]`
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
