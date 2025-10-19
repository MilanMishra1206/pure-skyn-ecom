import React, { useState } from "react";
import { Divider, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import CustomMegaDropdown from "./CustomMegaDropdown";
import Resources from "../../config/Resources";
import MobileMenu from "./MobileMenu";
import CustomDrawer from "../CustomDrawer";
import CartDrawer from "../../components/CartDrawer";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-6 md:px-10">
          <p className="text-sm hidden lg:!block">
            ⭐ ₹125 OFF above ₹2999! Use{" "}
            <span className="text-[#0f4a51] font-medium">CLK125</span> ⭐
          </p>
          <button
            className="md:hidden cursor-pointer text-2xl text-[#0f4a51]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiMenuAlt3 />
          </button>
          <Link
            to="/"
            className="flex-shrink-0 text-xl font-bold text-center md:text-left"
          >
            <img
              src={Resources.images.home.arthwaLogo}
              alt="Arthwa_Logo"
              className="h-24 w-auto"
            />
          </Link>
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="text-[#0f4a51] hover:!text-[#15676e] text-lg flex font-medium gap-2 items-center"
            >
              <CiUser size="1.5rem" />
              <span className="hidden sm:inline">Login</span>
            </Link>
            <Link
              onClick={() => setCartDrawerOpen(true)}
              className="!text-[#0f4a51] hover:!text-[#15676e] border-none outline-none text-lg flex font-medium gap-2 items-center"
            >
              <CiShoppingCart size="1.5rem" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>

        <Divider />

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 font-medium justify-center py-2 cursor-pointer">
          <CustomMegaDropdown
            id="brands"
            title="Brands"
            menuTitle="Top Brands"
            showRightMenu={false}
            menuItems={[
              { label: "Ageing", link: "/products/skin/ageing" },
              { label: "Acne & Acne Scars", link: "/products/skin/acne-scars" },
              {
                label: "Damaged & Sensitive Skin",
                link: "/products/skin/acne-scars",
              },
              { label: "Pigmentation", link: "/products/skin/pigmentation" },
              { label: "Under Eye Concerns", link: "/products/skin/under-eye" },
              { label: "Stretch Marks", link: "/products/skin/stretch-marks" },
            ]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <CustomMegaDropdown
            id="skin"
            title="Skin"
            menuTitle="Skin"
            showRightMenu
            menuItems={[
              { label: "Sunscreen", link: "/products/skin#sunscreen" },
              { label: "Face Serum", link: "/products/skin#faceSerum" },
              { label: "Facewash", link: "/products/skin#facewash" },
              { label: "Moisturiser", link: "/products/skin#moisturiser" },
              {
                label: "Pigmentation",
                link: "/products/skin#pigmentation",
              },
              {
                label: "Skin Antioxidant",
                link: "/products/skin#skinAntioxidant",
              },
            ]}
            image={Resources.images.navbar.skinNavbar}
            info={{
              title: "Acne & Acne Scars",
              description:
                "Acne & Acne Scars are often challenging to manage and treat. Discover effective anti-acne range to manage it",
              primary: { label: "Buy Now", href: "/" },
              secondary: { label: "Details", href: "/" },
            }}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <CustomMegaDropdown
            id="hair"
            title="Hair"
            menuTitle="Hair Care"
            showRightMenu
            menuItems={[
              { label: "Hair Fall", link: "/products/hair/hair-full" },
              { label: "Dandruff", link: "/products/hair/dandruff" },
              { label: "Dry & Frizzy Hair", link: "/products/hair/dry-frizzy" },
            ]}
            image={Resources.images.navbar.hairNavbar}
            info={{
              title: "Hair Fall",
              description: "Find products and treatments to reduce hair fall.",
              primary: { label: "Explore", href: "/hair" },
              secondary: { label: "Learn More", href: "/hair-learn" },
            }}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />{" "}
          <CustomMegaDropdown
            id="more"
            title="More"
            showRightMenu={false}
            menuItems={[
              { label: "About Us", link: "/about-us" },
              { label: "FAQs", link: "/faq" },
              { label: "Contact Us", link: "/contact-us" },
            ]}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </div>
      </div>

      {/* Mobile Burger Menu */}
      <CustomDrawer
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        anchorPosition="left"
        paperClass="!rounded-none !w-[80%] sm:!w-[60%]"
        childClass="p-4"
        paperClassToOverride="!w-[80%] sm:!w-[60%] !h-full"
      >
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      </CustomDrawer>

      {/* Cart Drawer */}
      <CustomDrawer
        open={cartDrawerOpen}
        setOpen={setCartDrawerOpen}
        anchorPosition={isMobile ? "bottom" : "right"}
        paperClass="!rounded-t-2xl md:!rounded-none !w-[80%] sm:!w-[60%]"
        childClass="p-4"
        classes="!h-[80%] !z-[1100]"
        paperClassToOverride="!w-full sm:!w-[40%] lg:!w-[30%] !h-[96%] md:!h-full"
      >
        <CartDrawer onClose={() => setCartDrawerOpen(false)} />
      </CustomDrawer>
    </div>
  );
}

export default Navbar;
