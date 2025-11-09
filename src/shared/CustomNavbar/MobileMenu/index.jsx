import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import Resources from "../../../config/Resources";
import MobileSubMenu from "./MobileSubMenu";
import { productList } from "../../../helpers/productsData";

function MobileMenu({ onClose }) {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const brandCollection = Array.from(
    new Set(productList.map((product) => product.brand).sort())
  ).map((brandName) => ({
    label: brandName,
    to: `/products#${brandName}`,
  }));

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center px-2 border-b border-black/10">
        <Link to="/" className="text-xl font-bold text-[#0f4a51]">
          <img
            src={Resources.images.home.arthwaLogo}
            alt="Arthwa_Logo"
            className="h-20 w-auto"
          />
        </Link>
        <button
          className="text-2xl text-[#0f4a51] cursor-pointer"
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
          links={brandCollection}
          onClose={onClose}
        />

        <MobileSubMenu
          title="Skin"
          menuKey="skin"
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          image={Resources.images.navbar.skinNavbar}
          subtitle="Skin"
          links={[
            { label: "Sunscreen", to: "/products/skin#sunscreen" },
            { label: "Face Serum", to: "/products/skin#faceSerum" },
            { label: "Facewash", to: "/products/skin#facewash" },
            { label: "Moisturiser", to: "/products/skin#moisturiser" },
            {
              label: "Pigmentation",
              to: "/products/skin#pigmentation",
            },
            {
              label: "Skin Antioxidant",
              to: "/products/skin#skinAntioxidant",
            },
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
            {
              label: "Hair Fall Control",
              to: "/products/hair#antiDandruff",
            },
            {
              label: "Dandruff & Scalp Care",
              to: "/products/hair#hairGrowth",
            },
            {
              label: "Oral Supplements",
              to: "/products/hair#oralSupplements",
            },
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
            className="text-[#0f4a51] px-2 py-3 cursor-pointer hover:bg-gray-100 rounded-md text-lg"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileMenu;
