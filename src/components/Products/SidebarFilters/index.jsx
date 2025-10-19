import React from 'react';
import { toTitleCase } from '../../../helpers/Common';

const SidebarFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  productTypes, 
  selectedTypes, 
  onChange,
  isCollectionPage // True if on /products route (URL has no category)
}) => {
  const primaryColor = '#0f4a51'; // Your primary color

  return (
    <div className="w-full bg-white shadow-md p-4 rounded-xl">
      
      {/* ------------------------------------------------------------
          1. TOP-LEVEL CATEGORY FILTER (Visible only on /products route)
          ------------------------------------------------------------ */}
      {isCollectionPage && (
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold mb-3 font-poppins text-gray-800">Shop By Category</h2>
          
          {/* All Products Option */}
          <div className="mb-2 cursor-pointer">
            <button
              onClick={() => onCategoryChange('all')}
              className={`w-full text-left py-2 px-3 rounded transition-all duration-200 text-sm font-medium 
                ${selectedCategory === 'all' 
                  ? 'bg-gray-100 text-gray-900 border-l-4 border-gray-400'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              All Products
            </button>
          </div>

          {/* Dynamic Categories (Skin, Hair, etc.) */}
          {categories.map((key) => (
            <div key={key} className="mb-2 cursor-pointer">
              <button
                onClick={() => onCategoryChange(key)}
                className={`w-full text-left py-2 px-3 rounded transition-all duration-200 text-sm font-medium capitalize 
                  ${selectedCategory === key 
                    ? 'bg-gray-100 font-semibold border-l-4'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={selectedCategory === key ? { borderColor: primaryColor, color: primaryColor } : {}}
              >
                {key}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------
          2. SUB-TYPE FILTERS (Sunscreen, Shampoo, etc.)
          ------------------------------------------------------------ */}
      <h2 className="text-xl font-bold mb-4 font-poppins text-gray-800">
        {isCollectionPage ? 'Filter By Type' : `${toTitleCase(selectedCategory)} Types`}
      </h2>
      
      {productTypes.map(({ key, label }) => (
        <div key={key} className="mb-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTypes.includes(key)}
              onChange={() => onChange(key)}
              // Apply brand color to checkbox border/check on selection
              className="w-4 h-4 border-gray-300 rounded focus:ring-transparent checked:bg-[#0f4a51] checked:border-transparent"
              style={{ accentColor: primaryColor }}
            />
            <span className="text-coal capitalize text-sm">
              {label.replace("-", " ")}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default SidebarFilters;