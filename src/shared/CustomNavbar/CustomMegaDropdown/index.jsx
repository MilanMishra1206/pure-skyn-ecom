import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setActiveDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger (Title + Arrow) */}
      <button
        onClick={() => setActiveDropdown(isOpen ? null : id)}
        className="flex items-center gap-1 text-[#0f4a51] hover:!text-[#15676e] px-2 focus:outline-none cursor-pointer"
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
          showRightMenu ? "w-[900px]" : "w-[200px]"
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
          <ul className="space-y-2 text-sm text-gray-700">
            {menuItems?.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.link || "/"}
                  className="hover:text-[#15676e]"
                  onClick={() => setActiveDropdown(null)} // close after click
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
                    className="bg-[#0f4a51] text-white px-2 lg:!px-4 py-2 rounded-md text-sm hover:bg-[#15676e]"
                  >
                    {info?.primary?.label}
                  </Link>
                  <Link
                    to={info?.secondary?.href || "/"}
                    className="text-[#0f4a51] font-medium text-sm hover:underline"
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
