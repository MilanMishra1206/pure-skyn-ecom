import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiSearch } from "react-icons/fi"; // Imported for the search bar icon

// Helper function to group and sort unique items by the first letter of their label
const groupAndSortItems = (items) => {
  if (!items) return {};
  
  // 1. Filter to ensure only unique items (based on the 'key' or implied unique brand ID) are processed
  const uniqueKeys = new Set();
  // We assume menuItems are objects like { label: 'BrandName', key: 'brandkey' }
  const uniqueItems = items.filter(item => {
      const itemKey = item.key || item.label; // Use key or label as unique identifier
      const isDuplicate = uniqueKeys.has(itemKey);
      uniqueKeys.add(itemKey);
      return !isDuplicate;
  });

  // 2. Sort items alphabetically by label
  const sortedItems = [...uniqueItems].sort((a, b) => 
    a.label.localeCompare(b.label)
  );

  // 3. Group items by the first letter
  return sortedItems.reduce((acc, item) => {
    let firstChar = item.label.charAt(0).toUpperCase();
    if (!/^[A-Z]$/.test(firstChar)) { 
        firstChar = '#'; // Group non-A-Z characters under '#'
    }
    
    if (!acc[firstChar]) {
      acc[firstChar] = [];
    }
    acc[firstChar].push(item);
    return acc;
  }, {});
};


const CustomMegaDropdown = ({
  id,
  title,
  menuTitle,
  menuItems,
  image,
  info,
  activeDropdown,
  setActiveDropdown,
  showRightMenu,
}) => {
  const isOpen = activeDropdown === id;
  const dropdownRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  
  const isBrandDropdown = id === 'brands';
  const primaryColor = "#0f4a51";
  const secondaryColor = "#15676e"; 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        if (isBrandDropdown) setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setActiveDropdown, isBrandDropdown]);


  // Memoized, filtered, and grouped items
  const groupedItems = useMemo(() => {
    let itemsToProcess = menuItems || [];

    // 1. Filtering based on search term (if present)
    if (searchTerm) {
        itemsToProcess = itemsToProcess.filter(item => 
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // 2. Group and sort only if it's the brand dropdown
    if (isBrandDropdown) {
        return groupAndSortItems(itemsToProcess);
    }
    
    // Fallback for other non-brand dropdowns
    // If not a brand dropdown, return items in a single 'All' group
    return { 'All': itemsToProcess }; 
  }, [menuItems, searchTerm, isBrandDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setActiveDropdown(isOpen ? null : id)}
        className="flex items-center gap-1 px-2 focus:outline-none cursor-pointer"
        style={{ color: primaryColor }}
      >
        <span>{title}</span>
        {isOpen ? (
          <IoIosArrowUp className="transition-transform duration-300" />
        ) : (
          <IoIosArrowDown className="transition-transform duration-300" />
        )}
      </button>

      {/* Dropdown Content */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 max-w-[600px] lg:!max-w-none ${
          // Use a wider width for the Brand dropdown
          isBrandDropdown ? "w-[250px]" : (showRightMenu ? "w-[900px]" : "w-[200px]")
        } bg-white shadow-lg rounded-br-lg rounded-bl-lg p-6 z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Left Menu */}
        <div
          className={`inline-block align-top cursor-pointer ${
            showRightMenu ? "w-1/3 pr-6 " : "w-full"
          }`}
        >
          {menuTitle && <h3 className="font-semibold mb-4">{menuTitle}</h3>}
          
          {/* 👇 Search Bar (only for Brands) */}
          {isBrandDropdown && (
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-8 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-opacity-50"
                style={{ borderColor: primaryColor }}
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}

          {/* 👇 Alphabetical List Container */}
          <div className="text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
            {Object.keys(groupedItems).sort().map((letter) => (
              <div key={letter} className="mb-4">
                {/* Brand Group Header: Sticky to remain visible while scrolling */}
                {isBrandDropdown && (
                    <h4 className="sticky top-0 z-10 font-bold text-base pt-1 pb-1 uppercase"
                        style={{ color: primaryColor, backgroundColor: 'white' }}>
                        {letter === '#' ? 'Others' : letter}
                    </h4>
                )}
                
                {/* List of Items in this Group */}
                <ul className="space-y-2">
                  {groupedItems[letter].map((item, idx) => (
                    <li key={item.label || idx} className="block">
                      <Link
                        to={item.link}
                        className="transition duration-150 hover:!text-[#0f4a51]"
                        onClick={() => {
                          setActiveDropdown(null);
                          setSearchTerm('');
                        }}
                        style={{ color: secondaryColor }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* No Results Message */}
            {Object.keys(groupedItems).length === 0 && (
              <p className="text-gray-500 text-center py-4">No {isBrandDropdown ? 'brands' : 'items'} found for "{searchTerm}".</p>
            )}
          </div>
        </div>

        {/* Right Image + Info */}
        {showRightMenu && (
          <div className="w-2/3 gap-6 pl-6 inline-block align-top border-l border-gray-200">
            <div className="flex flex-col lg:!flex-row lg:!items-center gap-4">
              <img
                src={image}
                alt={info?.title}
                className="rounded-lg w-2/3 object-cover"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-2">{info?.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {info?.description}
                </p>
                <div className="flex space-x-4 items-center">
                  <Link
                    to={info?.primary?.href || "/"}
                    className="text-white px-2 lg:!px-4 py-2 rounded-md text-sm hover:bg-[#15676e]"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {info?.primary?.label}
                  </Link>
                  <Link
                    to={info?.secondary?.href || "/"}
                    className="font-medium text-sm hover:underline"
                    style={{ color: primaryColor }}
                  >
                    {info?.secondary?.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMegaDropdown;