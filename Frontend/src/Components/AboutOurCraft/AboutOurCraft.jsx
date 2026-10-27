import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCopy,
  FiCheck,
  FiNavigation,
  FiExternalLink,
} from "react-icons/fi";

import "./AboutOurCraft.css";
import craftImage from "../../assets/collection-3.png";

/* =====================================================
   STORE DETAILS  –  edit these to your real information
===================================================== */

const STORE = {
  name: "ODC Handloom Showroom",
  addressLines: ["Bhubaneswar", "Odisha, India"],
  mapQuery: "Bhubaneswar, Odisha, India",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  email: "support@odchandloom.com",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  /* Used for the live "Open now / Closed now" badge (IST) */
  openMinutes: 10 * 60,
  closeMinutes: 19 * 60,
  closedDay: "Sun",
};

const FULL_ADDRESS = `${STORE.name}, ${STORE.addressLines.join(", ")}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  STORE.mapQuery
)}`;
const OPEN_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STORE.mapQuery
)}`;

const FEATURES = ["authentic", "traditional", "timeless"];

const DUST = [
  { x: "10%", s: "5px", d: "10s", delay: "0s" },
  { x: "24%", s: "3px", d: "13s", delay: "2s" },
  { x: "38%", s: "6px", d: "11s", delay: "4s" },
  { x: "52%", s: "4px", d: "14s", delay: "1s" },
  { x: "66%", s: "3px", d: "10.5s", delay: "5s" },
  { x: "80%", s: "5px", d: "12s", delay: "3s" },
  { x: "92%", s: "4px", d: "13.5s", delay: "6s" },
];

/* =====================================================
   HELPERS
===================================================== */

const getStoreStatus = () => {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());

    const get = (type) => parts.find((part) => part.type === type)?.value;
    const day = get("weekday");
    const minutes = Number(get("hour")) * 60 + Number(get("minute"));

    return (
      day !== STORE.closedDay &&
      minutes >= STORE.openMinutes &&
      minutes < STORE.closeMinutes
    );
  } catch {
    return false;
  }
};

const useInView = (ref) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
};

/* =====================================================
   DECORATIVE PIECES
===================================================== */

const Ornament = ({ className = "" }) => (
  <svg
    className={`AboutOurCraft-ornament ${className}`}
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

const FeatureIcon = ({ type }) => {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };

  if (type === "authentic") {
    return (
      <svg {...common}>
        <path d="M24 9c6 2 9 8 7 14-6-1-10-6-7-14Z" />
        <path d="M24 9v15" />
        <path d="M9 33c5 0 8-2 11-4h7c2 0 3 2 1 3l-8 5H9" />
        <path d="M27 29l8-3c2-1 4 1 2 3l-6 4" />
      </svg>
    );
  }

  if (type === "traditional") {
    return (
      <svg {...common}>
        <path d="M24 6l10 10-10 10-10-10Z" />
        <path d="M24 22l10 10-10 10-10-10Z" />
        <path d="M14 16l-8 8 8 8M34 16l8 8-8 8" />
        <path d="M24 13l3 3-3 3-3-3ZM24 29l3 3-3 3-3-3Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M24 8c-5 6-5 14 0 22 5-8 5-16 0-22Z" />
      <path d="M24 30c-8-2-13-9-12-17 6 3 10 9 12 17Z" />
      <path d="M24 30c8-2 13-9 12-17-6 3-10 9-12 17Z" />
      <path d="M24 30c-10 2-17-2-20-9 7-1 15 2 20 9Z" />
      <path d="M24 30c10 2 17-2 20-9-7-1-15 2-20 9Z" />
    </svg>
  );
};

const FEATURE_TEXT = {
  authentic: ["Authentic", "Handloom"],
  traditional: ["Traditional", "Techniques"],
  timeless: ["Timeless", "Creations"],
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

const AboutOurCraft = () => {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const locationRef = useRef(null);
  const copyTimer = useRef(null);

  const heroInView = useInView(heroRef);
  const locationInView = useInView(locationRef);

  const [imageFailed, setImageFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isOpen, setIsOpen] = useState(getStoreStatus);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setIsOpen(getStoreStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  /* Pointer parallax for the image collage */
  const handleMove = (event) => {
    if (reducedMotion) return;
    const node = visualRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--AboutOurCraft-px", x.toFixed(3));
    node.style.setProperty("--AboutOurCraft-py", y.toFixed(3));
  };

  const handleLeave = () => {
    const node = visualRef.current;
    if (!node) return;
    node.style.setProperty("--AboutOurCraft-px", "0");
    node.style.setProperty("--AboutOurCraft-py", "0");
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(FULL_ADDRESS);
      } else {
        const area = document.createElement("textarea");
        area.value = FULL_ADDRESS;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
      }
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="AboutOurCraft" aria-label="Our craftsmanship">
      {/* ===================== HERO ===================== */}
      <div
        className={`AboutOurCraft-hero ${heroInView ? "AboutOurCraft-inview" : ""}`}
        ref={heroRef}
      >
        {/* ---------- Content (left) ---------- */}
        <div className="AboutOurCraft-content">
          <div className="AboutOurCraft-eyebrow AboutOurCraft-reveal" style={{ "--AboutOurCraft-i": 0 }}>
            <span>Our Craftsmanship</span>
            <span className="AboutOurCraft-eyebrow-line">
              <i />
              <Ornament />
              <i />
            </span>
          </div>

          <h2 className="AboutOurCraft-title AboutOurCraft-reveal" style={{ "--AboutOurCraft-i": 1 }}>
            From Looms to
            <em>Beautiful Creations</em>
          </h2>

          <p className="AboutOurCraft-text AboutOurCraft-reveal" style={{ "--AboutOurCraft-i": 2 }}>
            At ODC-HANDLOOM, our sarees are crafted by skilled artisans from across India,
            keeping alive centuries-old weaving traditions. Each piece is a unique blend of
            heritage, intricate craftsmanship and contemporary design.
          </p>

          <ul className="AboutOurCraft-features">
            {FEATURES.map((feature, index) => (
              <li
                key={feature}
                className="AboutOurCraft-feature AboutOurCraft-reveal"
                style={{ "--AboutOurCraft-i": 3 + index }}
              >
                <span className="AboutOurCraft-feature-icon">
                  <FeatureIcon type={feature} />
                </span>
                <span className="AboutOurCraft-feature-label">
                  {FEATURE_TEXT[feature].map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <div className="AboutOurCraft-footer AboutOurCraft-reveal" style={{ "--AboutOurCraft-i": 6 }}>
            <Link to="/collections" className="AboutOurCraft-button">
              <span>Explore Our Craft</span>
              <FiArrowRight />
            </Link>

            <div className="AboutOurCraft-note" aria-hidden="true">
              <span className="AboutOurCraft-note-line" />
              <Ornament className="AboutOurCraft-note-ornament" />
              <span className="AboutOurCraft-note-text">Indian Crafts Forever</span>
            </div>
          </div>
        </div>

        {/* ---------- Visual (right) ---------- */}
        <aside
          className="AboutOurCraft-visual"
          ref={visualRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          aria-label="Artisan weaving a handloom saree"
        >
          <div className="AboutOurCraft-stage">
            <span className="AboutOurCraft-outline" aria-hidden="true" />
            <span className="AboutOurCraft-outline-ornament" aria-hidden="true">
              <Ornament />
            </span>

            <div className="AboutOurCraft-photo">
              <div className="AboutOurCraft-photo-parallax">
                {imageFailed ? (
                  <div className="AboutOurCraft-photo-fallback" aria-hidden="true" />
                ) : (
                  <img
                    className="AboutOurCraft-photo-img"
                    src={craftImage}
                    alt="Artisan weaving a handloom saree"
                    loading="lazy"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>

              <span className="AboutOurCraft-glow" aria-hidden="true" />
              <span className="AboutOurCraft-sheen" aria-hidden="true" />

              {DUST.map((dust, i) => (
                <span
                  key={i}
                  className="AboutOurCraft-dust"
                  aria-hidden="true"
                  style={{
                    "--AboutOurCraft-x": dust.x,
                    "--AboutOurCraft-size": dust.s,
                    "--AboutOurCraft-duration": dust.d,
                    "--AboutOurCraft-delay": dust.delay,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Maroon heritage card */}
          <div className="AboutOurCraft-card-pos AboutOurCraft-card-pos-heritage">
            <div className="AboutOurCraft-heritage">
              <span>Woven</span>
              <span>With</span>
              <span>Heritage</span>
              <i className="AboutOurCraft-heritage-line" />
              <Ornament className="AboutOurCraft-heritage-ornament" />
              <i className="AboutOurCraft-heritage-line" />
            </div>
          </div>

          {/* Fabric detail swatch */}
          <div className="AboutOurCraft-card-pos AboutOurCraft-card-pos-swatch">
            <figure className="AboutOurCraft-swatch">
              {imageFailed ? (
                <div className="AboutOurCraft-swatch-fallback" aria-hidden="true" />
              ) : (
                <img src={craftImage} alt="Close-up of handwoven zari border" loading="lazy" />
              )}
              <figcaption>Zari detail</figcaption>
            </figure>
          </div>
        </aside>
      </div>

    
    </section>
  );
};

export default AboutOurCraft;