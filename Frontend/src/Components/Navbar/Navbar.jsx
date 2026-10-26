import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";

import "./Navbar.css";

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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

  /* Stronger shadow once the navbar sticks to the top */
  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock page scroll while the mobile menu is open + close on Escape */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsCollectionOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCollectionOpen(false);
  };

  const renderLink = (link) => (
    <NavLink
      key={link.path}
      to={link.path}
      end={link.path === "/"}
      className={({ isActive }) =>
        `Navbar-link ${isActive ? "Navbar-link-active" : ""}`
      }
      onClick={closeMenu}
    >
      <span>{link.title}</span>
    </NavLink>
  );

  return (
    <header className={`Navbar ${isStuck ? "Navbar-stuck" : ""}`}>
      <div className="Navbar-container">
        {/* Mobile menu button */}
        <button
          type="button"
          className="Navbar-menu-toggle"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
          <span>Menu</span>
        </button>

        {/* Tagline */}
        <span className="Navbar-tagline">Handmade with Heritage</span>

        {/* Navigation */}
        <nav
          className={`Navbar-navigation ${
            isMenuOpen ? "Navbar-navigation-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="Navbar-links">
            {navLinks.slice(0, 2).map(renderLink)}

            {/* Collections dropdown */}
            <div
              className={`Navbar-dropdown ${
                isCollectionOpen ? "Navbar-dropdown-open" : ""
              }`}
              onMouseEnter={() => {
                if (window.innerWidth > 900) setIsCollectionOpen(true);
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 900) setIsCollectionOpen(false);
              }}
            >
              <button
                type="button"
                className="Navbar-link Navbar-dropdown-toggle"
                aria-expanded={isCollectionOpen}
                aria-haspopup="true"
                onClick={() => setIsCollectionOpen((previous) => !previous)}
              >
                <span>Collections</span>
                <FiChevronDown className="Navbar-dropdown-icon" />
              </button>

              <div className="Navbar-dropdown-menu">
                <div className="Navbar-dropdown-heading">
                  <span>Explore collections</span>
                  <span className="Navbar-dropdown-line" />
                </div>

                {collectionLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="Navbar-dropdown-item"
                    onClick={closeMenu}
                  >
                    <span className="Navbar-dropdown-dot" />
                    <span>{link.title}</span>
                    <FiArrowUpRight className="Navbar-dropdown-arrow" />
                  </NavLink>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map(renderLink)}
          </div>

          {/* Track order – shown inside the mobile drawer */}
          <Link
            to="/track-order"
            className="Navbar-track-order Navbar-track-mobile"
            onClick={closeMenu}
          >
            <span>Track Order</span>
            <FiArrowUpRight className="Navbar-track-icon" />
          </Link>
        </nav>

        {/* Track order – desktop */}
        <Link
          to="/track-order"
          className="Navbar-track-order Navbar-track-desktop"
        >
          <span>Track Order</span>
          <FiArrowUpRight className="Navbar-track-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;