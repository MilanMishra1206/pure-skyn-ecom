import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import Resources from "../../../config/Resources";
import MobileSubMenu from "./MobileSubMenu";

function MobileMenu({ onClose }) {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center px-2 h-[70px] border-b border-black/10">
        <Link to="/" className="text-xl font-bold text-[#8D261F]">
          PureSkyn Meds
        </Link>
        <button
          className="text-2xl text-[#8D261F] cursor-pointer"
          onClick={onClose}
        >
          <HiX />
        </button>
      </div>

      <div className="flex flex-col gap-4 py-6 font-medium text-gray-700 overflow-y-auto">
        <MobileSubMenu
          title="Brands"
          menuKey="brands"
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          subtitle="Popular Brands"
          links={[
            { to: "/brands/brand1", label: "Brand 1" },
            { to: "/brands/brand2", label: "Brand 2" },
          ]}
          onClose={onClose}
        />

        <MobileSubMenu
          title="Skin"
          menuKey="skin"
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          image={Resources.images.navbar.skinNavbar}
          subtitle="Concerns Related to Skin"
          links={[
            { to: "/skin/ageing", label: "Ageing" },
            { to: "/skin/acne-scars", label: "Acne & Acne Scars" },
            { to: "/skin/damaged", label: "Damaged & Sensitive Skin" },
            { to: "/skin/pigmentation", label: "Pigmentation" },
          ]}
          onClose={onClose}
        />

        <MobileSubMenu
          title="Hair"
          menuKey="hair"
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          image={Resources.images.navbar.hairNavbar}
          subtitle="Hair Care Concerns"
          links={[
            { to: "/hair/fall", label: "Hair Fall" },
            { to: "/hair/dandruff", label: "Dandruff" },
            { to: "/hair/frizzy", label: "Dry & Frizzy Hair" },
          ]}
          onClose={onClose}
        />

        {[
          { to: "/about-us", label: "About Us" },
          { to: "/faq", label: "FAQs" },
          { to: "/contact-us", label: "Contact Us" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            className="text-[#8D261F] px-2 py-3 cursor-pointer hover:bg-[#f7e3e1] rounded-md text-lg"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileMenu;
