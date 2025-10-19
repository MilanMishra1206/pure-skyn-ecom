import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Link } from "react-router-dom";

const MobileSubMenu = ({
  title,
  menuKey,
  openSubMenu,
  toggleSubMenu,
  image,
  subtitle,
  links,
  onClose,
}) => {
  const isOpen = openSubMenu === menuKey;

  return (
    <div>
      <button
        className="w-full flex justify-between items-center text-left text-[#0f4a51] px-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md"
        onClick={() => toggleSubMenu(menuKey)}
      >
        <span className="text-lg">{title}</span>
        {isOpen ? (
          <HiChevronUp size="1.5rem" />
        ) : (
          <HiChevronDown size="1.5rem" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col p-2">
          {image && (
            <img src={image} alt={title} className="w-full h-48 object-cover" />
          )}

          {subtitle && (
            <p className="px-6 mt-4 mb-2 font-semibold text-[#0f4a51]">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col py-4">
            {links.map(({ to, label }, idx) => (
              <Link
                key={idx}
                to={to}
                onClick={onClose}
                className="px-6 py-3 border-t border-black/10 hover:bg-gray-100"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSubMenu;
