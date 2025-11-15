import React from "react";

function CategoryTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 overflow-x-auto mb-4">
      {categories?.map((category) => (
        <button
          key={category?.name}
          className={`
            px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer
            ${
              category?.subCategory === activeCategory
                ? "bg-[#0f4a51] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
          onClick={() => onSelectCategory(category?.subCategory)}
        >
          {category?.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
