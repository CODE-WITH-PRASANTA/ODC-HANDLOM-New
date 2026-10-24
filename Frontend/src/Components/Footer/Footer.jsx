
import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMapPin,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiArrowUp,
} from "react-icons/fi";

import "./Footer.css";
import logo from "../../assets/ODC GANDLOM LOGO.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { title: "Men's Wear", path: "/collections/mens-wear" },
    { title: "Women's Wear", path: "/collections/womens-wear" },
    { title: "Kurta", path: "/collections/kurta" },
    { title: "Dress Materials", path: "/collections/dress-materials" },
    { title: "New Arrivals", path: "/collections/new-arrivals" },
    { title: "Sale", path: "/collections/sale" },
  ];

  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Our Collections", path: "/collections" },
    { title: "Blog", path: "/blog" },
    { title: "Frequently Asked Questions", path: "/faq" },
    { title: "Contact Us", path: "/contact" },
  ];

  const supportLinks = [
    { title: "Track Your Order", path: "/track-order" },
    { title: "My Account", path: "/account" },
    { title: "Wishlist", path: "/wishlist" },
    { title: "Shopping Bag", path: "/cart" },
    { title: "Shipping Information", path: "/shipping" },
    { title: "Return & Exchange", path: "/returns" },
  ];

  const socialLinks = [
    {
      title: "Instagram",
      icon: <FiInstagram />,
      url: "https://www.instagram.com/",
    },
    {
      title: "Facebook",
      icon: <FiFacebook />,
      url: "https://www.facebook.com/",
    },
    {
      title: "YouTube",
      icon: <FiYoutube />,
      url: "https://www.youtube.com/",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="Footer">
      {/* Decorative Top Border */}
      <div className="Footer-top-border" />

      <div className="Footer-container">
        {/* Main Footer */}
        <div className="Footer-main">

          {/* Brand Section */}
          <div className="Footer-brand">
            <Link to="/" className="Footer-logo">
              <img src={logo} alt="Taneira Logo" />
            </Link>

            <p className="Footer-brand-description">
              Discover timeless elegance through thoughtfully crafted
              ethnic wear. Celebrate tradition, embrace beauty, and
              make every occasion unforgettable.
            </p>

            <div className="Footer-brand-label">
              <span className="Footer-brand-line" />
              <span>Tradition in Every Thread</span>
            </div>

            {/* Social Links */}
            <div className="Footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.url}
                  className="Footer-social-link"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.title}
                  title={social.title}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="Footer-column">
            <h3 className="Footer-heading">Explore</h3>
            <span className="Footer-heading-line" />

            <ul className="Footer-link-list">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="Footer-link">
                    <FiArrowUpRight className="Footer-link-icon" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Categories */}
          <div className="Footer-column">
            <h3 className="Footer-heading">Shop Collections</h3>
            <span className="Footer-heading-line" />

            <ul className="Footer-link-list">
              {shopLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="Footer-link">
                    <FiArrowUpRight className="Footer-link-icon" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="Footer-column Footer-support">
            <h3 className="Footer-heading">Customer Care</h3>
            <span className="Footer-heading-line" />

            <ul className="Footer-link-list">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="Footer-link">
                    <FiArrowUpRight className="Footer-link-icon" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="Footer-contact">
              <h4 className="Footer-contact-heading">
                Need assistance?
              </h4>

              <a
                href="mailto:care@example.com"
                className="Footer-contact-item"
              >
                <FiMail />
                <span>Contact Customer Care</span>
              </a>

              <div className="Footer-contact-item">
                <FiMapPin />
                <span>Discover timeless Indian craftsmanship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter / Brand Statement */}
        <div className="Footer-highlight">
          <div className="Footer-highlight-content">
            <span className="Footer-highlight-eyebrow">
              Woven with love
            </span>

            <h3 className="Footer-highlight-title">
              Elegance that tells your story.
            </h3>

            <p className="Footer-highlight-text">
              Explore styles that bring heritage and contemporary
              fashion together.
            </p>
          </div>

          <Link to="/collections" className="Footer-highlight-button">
            Explore Collections
            <FiArrowUpRight />
          </Link>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="Footer-bottom">
        <div className="Footer-bottom-container">
          <p className="Footer-copyright">
            © {currentYear} TANEIRA. All rights reserved.
          </p>

          <p className="Footer-developed">
            Developed with <span className="Footer-heart">♥</span> by{" "}
            <a
              href="https://prwebstock.com/"
              target="_blank"
              rel="noreferrer"
              className="Footer-developer-link"
            >
              PR WEBSTOCK
            </a>
          </p>

          <button
            type="button"
            className="Footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
