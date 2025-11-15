import React from "react";

function Testimonial({ quote, author }) {
  return (
    <div className="py-4 mb-10 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl font-serif text-gray-700 leading-relaxed mb-6 !font-poppins">
          <span className="text-gray-300 mr-2 text-5xl relative top-4">“</span>
          {quote}
        </p>
        <p className="text-sm font-semibold text-[#15676e]">— {author}</p>
      </div>
    </div>
  );
}

export default Testimonial;
