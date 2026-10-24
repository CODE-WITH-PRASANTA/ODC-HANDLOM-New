
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";

import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  const collectionLinks = [
    { title: "Men's Wear", path: "/collections/mens-wear" },
    { title: "Women's Wear", path: "/collections/womens-wear" },
    { title: "Kurta", path: "/collections/kurta" },
    { title: "Dress Materials", path: "/collections/dress-materials" },
    { title: "New Arrival", path: "/collections/new-arrivals" },
    { title: "Sale", path: "/collections/sale" },
  ];

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "FAQ", path: "/faq" },
    { title: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCollectionOpen(false);
  };

  return (
    <header className="Navbar">
      <div className="Navbar-container">

        {/* Desktop / Mobile Navigation */}
        <nav
          className={`Navbar-navigation ${
            isMenuOpen ? "Navbar-navigation-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="Navbar-links">

            {/* Main Links */}
            {navLinks.slice(0, 2).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `Navbar-link ${isActive ? "Navbar-link-active" : ""}`
                }
                onClick={closeMenu}
              >
                {link.title}
              </NavLink>
            ))}

            {/* Collections Dropdown */}
            <div
              className={`Navbar-dropdown ${
                isCollectionOpen ? "Navbar-dropdown-open" : ""
              }`}
              onMouseEnter={() => {
                if (window.innerWidth > 768) {
                  setIsCollectionOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  setIsCollectionOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="Navbar-link Navbar-dropdown-toggle"
                aria-expanded={isCollectionOpen}
                aria-haspopup="true"
                onClick={() =>
                  setIsCollectionOpen((previous) => !previous)
                }
              >
                <span>Collections</span>
                <FiChevronDown className="Navbar-dropdown-icon" />
              </button>

              <div className="Navbar-dropdown-menu">
                <div className="Navbar-dropdown-heading">
                  <span>Explore Collections</span>
                  <span className="Navbar-dropdown-line" />
                </div>

                {collectionLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="Navbar-dropdown-item"
                    onClick={closeMenu}
                  >
                    <span className="Navbar-dropdown-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{link.title}</span>

                    <FiArrowUpRight className="Navbar-dropdown-arrow" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Remaining Main Links */}
            {navLinks.slice(2).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `Navbar-link ${isActive ? "Navbar-link-active" : ""}`
                }
                onClick={closeMenu}
              >
                {link.title}
              </NavLink>
            ))}

            {/* Track Order */}
            <Link
              to="/track-order"
              className="Navbar-track-order"
              onClick={closeMenu}
            >
              <span>Track Order</span>
              <FiArrowUpRight className="Navbar-track-icon" />
            </Link>

          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="Navbar-menu-toggle"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>
    </header>
  );
};

export default Navbar;
