import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

import "./Topbar.css";
import logo from "../../assets/navbarlogo.png";

const Topbar = ({ wishlistCount = 0, cartCount = 0 }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearchValue("");
  };

  return (
    <header className="Topbar">
      {/* Announcement strip */}
      <div className="Topbar-announcement">
        <p>Handwoven in Odisha &nbsp;|&nbsp; Free shipping on orders above ₹1,999</p>
      </div>

      <div className="Topbar-container">
        {/* Logo */}
        <Link to="/" className="Topbar-logo" aria-label="ODC Handloom home">
          <img src={logo} alt="ODC Handloom" />
        </Link>

        {/* Search */}
        <form className="Topbar-search" role="search" onSubmit={handleSearch}>
          <FiSearch className="Topbar-search-icon" aria-hidden="true" />

          <input
            type="search"
            placeholder="Search sarees, kurtas, dress materials…"
            aria-label="Search products"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />

          <button
            type="submit"
            className="Topbar-search-button"
            aria-label="Search"
          >
            <FiSearch />
          </button>
        </form>

        {/* Account, Wishlist & Cart */}
        <div className="Topbar-actions">
          <Link
            to="/account"
            className="Topbar-action"
            aria-label="My Account"
            title="My Account"
          >
            <FiUser className="Topbar-action-icon" />
          </Link>

          <Link
            to="/wishlist"
            className="Topbar-action"
            aria-label={`Wishlist, ${wishlistCount} items`}
            title="Wishlist"
          >
            <FiHeart className="Topbar-action-icon" />
            <span className="Topbar-badge">{wishlistCount}</span>
          </Link>

          <Link
            to="/cart"
            className="Topbar-action"
            aria-label={`Shopping bag, ${cartCount} items`}
            title="Shopping Bag"
          >
            <FiShoppingBag className="Topbar-action-icon" />
            <span className="Topbar-badge">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;