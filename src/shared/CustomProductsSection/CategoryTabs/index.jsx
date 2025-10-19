import React from "react";

function CategoryTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 overflow-x-auto py-4 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          className={`
            px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200
            ${
              category === activeCategory
                ? "bg-[#0f4a51] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
