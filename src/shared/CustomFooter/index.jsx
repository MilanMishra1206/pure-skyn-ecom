import React from "react";
import { Link } from "react-router-dom";
import Resources from "../../config/Resources";

function CustomFooter() {
  const primaryColor = "#15676e"; // A single variable for the brand color

  return (
    <footer className="w-full bg-white text-gray-700">
      {/* Top Section: Value Propositions */}
      <div className="border-t border-b border-gray-300 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8">
          <div className="flex flex-col items-center">
            <img
              src={Resources.images.footer.freeDelivery}
              alt="Free Shipping"
              className="h-10 mb-2"
            />
            <span className="font-semibold text-lg">Free Shipping</span>
            <p className="text-sm text-gray-500">On all orders over $50</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={Resources.images.footer.codAvailable}
              alt="Lowest Price"
              className="h-10 mb-2"
            />
            <span className="font-semibold text-lg">Lowest Price</span>
            <p className="text-sm text-gray-500">Price match guarantee</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={Resources.images.footer.originalImg}
              alt="100% Original"
              className="h-10 mb-2"
            />
            <span className="font-semibold text-lg">100% Original</span>
            <p className="text-sm text-gray-500">Genuine products assured</p>
          </div>
        </div>
      </div>

      {/* Main Section: Links & Company Info */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={Resources.images.home.arthwaLogo}
                alt="Arthwa_Logo"
                className="h-12 w-auto"
              />
              <span
                className="ml-2 text-2xl font-bold"
                style={{ color: primaryColor }}
              >
                Arthwa
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Your tagline or a brief description of what your business does.
            </p>
          </div>

          {/* About Us Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: primaryColor }}
            >
              About
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#15676e] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#15676e] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: primaryColor }}
            >
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/faq"
                  className="hover:text-[#15676e] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-[#15676e] transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-[#15676e] transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#15676e] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: primaryColor }}
            >
              Get In Touch
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                123 Main Street, Suite 456
                <br />
                Anytown, India 12345
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@arthwa.com"
                  className="hover:text-gray-900"
                >
                  info@arthwa.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:123-456-7890" className="hover:text-gray-900">
                  123-456-7890
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Socials */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} Arthwa. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;
