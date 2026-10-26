import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

import "./Footer.css";
import logo from "../../assets/navbarlogo.png";

/* Four-point ornament used across the footer */
const Ornament = ({ className = "" }) => (
  <svg
    className={`Footer-ornament ${className}`}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 1.2 14.4 9.6 22.8 12 14.4 14.4 12 22.8 9.6 14.4 1.2 12 9.6 9.6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M12 5.6 13.3 10.7 18.4 12 13.3 13.3 12 18.4 10.7 13.3 5.6 12 10.7 10.7Z"
      fill="currentColor"
      opacity="0.35"
    />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" />
  </svg>
);

const quickLinks = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Our Collections", path: "/collections" },
  { title: "Blog", path: "/blog" },
  { title: "Frequently Asked Questions", path: "/faq" },
  { title: "Contact Us", path: "/contact" },
];

const shopLinks = [
  { title: "Men's Wear", path: "/collections/mens-wear" },
  { title: "Women's Wear", path: "/collections/womens-wear" },
  { title: "Kurta", path: "/collections/kurta" },
  { title: "Dress Materials", path: "/collections/dress-materials" },
  { title: "New Arrivals", path: "/collections/new-arrivals" },
  { title: "Sale", path: "/collections/sale" },
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
  { title: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/" },
  { title: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/" },
  { title: "YouTube", icon: <FaYoutube />, url: "https://www.youtube.com/" },
];

const FooterColumn = ({ title, links, children, className = "" }) => (
  <div className={`Footer-column ${className}`}>
    <h3 className="Footer-heading">{title}</h3>

    <div className="Footer-heading-line" aria-hidden="true">
      <Ornament />
      <span />
    </div>

    <ul className="Footer-link-list">
      {links.map((link) => (
        <li key={link.path}>
          <Link to={link.path} className="Footer-link">
            {link.title}
          </Link>
        </li>
      ))}
    </ul>

    {children}
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="Footer">
      {/* Gold top rule with centre ornament */}
      <div className="Footer-top-border" aria-hidden="true">
        <span className="Footer-top-line" />
        <Ornament className="Footer-top-ornament" />
        <span className="Footer-top-line" />
      </div>

      <div className="Footer-container">
        <div className="Footer-main">
          {/* ---------- Brand ---------- */}
          <div className="Footer-brand">
            <Link to="/" className="Footer-logo" aria-label="ODC Handloom home">
              <img src={logo} alt="ODC Handloom" />
            </Link>

            <p className="Footer-brand-description">
              Discover timeless elegance through thoughtfully crafted ethnic
              wear. Celebrate tradition, embrace beauty, and make every
              occasion unforgettable.
            </p>

            <div className="Footer-brand-label">
              <span className="Footer-brand-line" />
              <span>Tradition in Every Thread</span>
              <span className="Footer-brand-line" />
            </div>

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

          {/* ---------- Explore ---------- */}
          <FooterColumn title="Explore" links={quickLinks} />

          {/* ---------- Shop Collections ---------- */}
          <FooterColumn title="Shop Collections" links={shopLinks} />

          {/* ---------- Customer Care ---------- */}
          <FooterColumn
            title="Customer Care"
            links={supportLinks}
            className="Footer-support"
          >
            <div className="Footer-contact">
              <div className="Footer-contact-divider" aria-hidden="true">
                <span />
                <Ornament />
                <span />
              </div>

              <h4 className="Footer-contact-heading">Need assistance?</h4>

              <a href="mailto:care@example.com" className="Footer-contact-item">
                <span className="Footer-contact-icon">
                  <FaEnvelope />
                </span>
                <span>Contact Customer Care</span>
              </a>

              <div className="Footer-contact-item">
                <span className="Footer-contact-icon">
                  <FaMapMarkerAlt />
                </span>
                <span>Discover timeless Indian craftsmanship</span>
              </div>
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="Footer-bottom">
        <div className="Footer-bottom-container">
          <p className="Footer-copyright">
            © {currentYear} ODC HANDLOOM. All rights reserved.
          </p>

          <div className="Footer-developed">
            <span className="Footer-developed-line" aria-hidden="true" />
            <Ornament className="Footer-developed-ornament" />
            <p>
              Developed with <FaHeart className="Footer-heart" /> by{" "}
              <a
                href="https://prwebstock.com/"
                target="_blank"
                rel="noreferrer"
                className="Footer-developer-link"
              >
                PR WEBSTOCK
              </a>
            </p>
            <Ornament className="Footer-developed-ornament" />
            <span className="Footer-developed-line" aria-hidden="true" />
          </div>
        </div>

        <div className="Footer-pattern" aria-hidden="true" />
      </div>
    </footer>
  );
};

export default Footer;