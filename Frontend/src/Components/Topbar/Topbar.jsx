import React from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import "./Topbar.css";
import logo from "../../assets/ODC GANDLOM LOGO.png";

const Topbar = () => {
  return (
    <header className="Topbar">
      <div className="Topbar-container">

        {/* Logo */}
        <Link to="/" className="Topbar-logo">
          <img src={logo} alt="Taneira Logo" />
        </Link>

        {/* Search Bar */}
        <div className="Topbar-search">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search products"
          />

         

          <button
            type="button"
            className="Topbar-search-button"
            aria-label="Search"
          >
            <FiSearch />
          </button>
        </div>

        {/* Account, Wishlist & Cart */}
        <div className="Topbar-actions">

          {/* Account */}
          <Link
            to="/account"
            className="Topbar-action"
            aria-label="My Account"
            title="My Account"
          >
            <FiUser className="Topbar-action-icon Topbar-user-icon" />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="Topbar-action Topbar-badge-wrapper"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <FiHeart className="Topbar-action-icon" />
            <span className="Topbar-badge">0</span>
          </Link>

          {/* Shopping Bag */}
          <Link
            to="/cart"
            className="Topbar-action Topbar-badge-wrapper"
            aria-label="Shopping Bag"
            title="Shopping Bag"
          >
            <FiShoppingBag className="Topbar-action-icon" />
            <span className="Topbar-badge">0</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Topbar;