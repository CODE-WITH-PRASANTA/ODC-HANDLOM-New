import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiUser,
  FiTag,
  FiChevronDown,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCopy,
  FiNavigation,
  FiExternalLink,
} from "react-icons/fi";

import "./ContactMain.css";

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
  whatsapp: "919876543210",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  /* Used to show the live "Open now / Closed now" badge (IST) */
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
const getMapSrc = (type) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(
    STORE.mapQuery
  )}&t=${type === "satellite" ? "k" : "m"}&z=14&ie=UTF8&iwloc=B&output=embed`;

const SUBJECTS = [
  "Product Enquiry",
  "Order Support",
  "Custom Order / Bulk Order",
  "Styling Advice",
  "Returns & Exchange",
  "Other",
];

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

/* =====================================================
   SAREE SLIDES  (drawn as animated SVG – no image files)
===================================================== */

const SAREE_SLIDES = [
  {
    name: "Kanjivaram Silk",
    detail: "Maroon & antique gold zari",
    palette: { light: "#d1436a", base: "#a31535", dark: "#5c0a21", gold: "#e0b455" },
  },
  {
    name: "Bomkai Silk",
    detail: "Emerald green with gold motifs",
    palette: { light: "#2fa882", base: "#0f6b52", dark: "#06382b", gold: "#e6bc5c" },
  },
  {
    name: "Sambalpuri Ikat",
    detail: "Royal indigo, handwoven in Odisha",
    palette: { light: "#6676de", base: "#2a3a8c", dark: "#0f1745", gold: "#ecc872" },
  },
];

/* =====================================================
   SMALL HELPERS
===================================================== */

const validate = (values) => {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.phone.trim() && !/^[+()\d\s-]{7,16}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.subject) {
    errors.subject = "Please select a subject.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
};

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
    className={`ContactMain-ornament ${className}`}
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

const Lotus = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 48 32" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M24 3C19 9 19 17 24 26 29 17 29 9 24 3Z" />
      <path d="M24 26C16 24 11 17 12 9 18 12 22 18 24 26Z" />
      <path d="M24 26C32 24 37 17 36 9 30 12 26 18 24 26Z" />
      <path d="M24 26C14 28 6 24 2 17 9 16 18 19 24 26Z" />
      <path d="M24 26C34 28 42 24 46 17 39 16 30 19 24 26Z" />
    </g>
  </svg>
);

const Jasmine = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse
        key={angle}
        cx="20"
        cy="11"
        rx="5.5"
        ry="9"
        transform={`rotate(${angle} 20 20)`}
        fill="#fffdf6"
        stroke="#e6d9b8"
        strokeWidth="0.6"
      />
    ))}
    <circle cx="20" cy="20" r="3.4" fill="#f2d98c" />
  </svg>
);

/* Hand-drawn silk saree with zari border, butta motifs and a rippling fabric effect */
const SareeArt = ({ palette, uid, label }) => {
  const { light, base, dark, gold } = palette;

  return (
    <svg
      className="ContactMain-saree-svg"
      viewBox="0 0 480 640"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={`silk-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="45%" stopColor={base} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>

        <linearGradient id={`zari-${uid}`} x1="0" y1="0" x2="0.5" y2="0" spreadMethod="reflect">
          <stop offset="0%" stopColor="#f7e4a8" />
          <stop offset="30%" stopColor={gold} />
          <stop offset="55%" stopColor="#fff0bf" />
          <stop offset="80%" stopColor="#b98a35" />
          <stop offset="100%" stopColor="#f7e4a8" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-0.5 0;0.5 0;-0.5 0"
            dur="7s"
            repeatCount="indefinite"
          />
        </linearGradient>

        <linearGradient id={`foldDark-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="50%" stopColor="#000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`foldLight-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={`vig-${uid}`} cx="50%" cy="45%" r="75%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>

        {/* Scattered butta (paisley) motif */}
        <pattern id={`butta-${uid}`} width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M32 10C42 20 42 36 32 48 22 36 22 20 32 10Z" fill={gold} opacity="0.9" />
          <path d="M32 18C37 24 37 33 32 40 27 33 27 24 32 18Z" fill={dark} opacity="0.55" />
          <circle cx="32" cy="29" r="2.2" fill={gold} />
          <path d="M0 -4 4 0 0 4 -4 0Z" fill={gold} opacity="0.8" />
          <path d="M64 -4 68 0 64 4 60 0Z" fill={gold} opacity="0.8" />
          <path d="M0 60 4 64 0 68 -4 64Z" fill={gold} opacity="0.8" />
          <path d="M64 60 68 64 64 68 60 64Z" fill={gold} opacity="0.8" />
        </pattern>

        {/* Border motif */}
        <pattern id={`motif-${uid}`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M18 4 32 18 18 32 4 18Z" fill="none" stroke={dark} strokeWidth="1.6" />
          <path d="M18 11 25 18 18 25 11 18Z" fill={dark} opacity="0.7" />
          <circle cx="18" cy="18" r="2" fill={gold} />
        </pattern>

        {/* Animated cloth ripple */}
        <filter id={`ripple-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.015"
            numOctaves="2"
            seed="4"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.008 0.015;0.013 0.021;0.008 0.015"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter={`url(#ripple-${uid})`}>
        {/* Base silk */}
        <rect x="-60" y="-60" width="600" height="760" fill={`url(#silk-${uid})`} />
        <rect x="-60" y="-60" width="600" height="760" fill={`url(#butta-${uid})`} opacity="0.5" />

        {/* Main zari border */}
        <g transform="rotate(-26 240 340)">
          <rect x="-340" y="290" width="1160" height="200" fill={`url(#zari-${uid})`} />
          <rect x="-340" y="290" width="1160" height="200" fill={`url(#motif-${uid})`} opacity="0.6" />
          <rect x="-340" y="290" width="1160" height="9" fill={dark} opacity="0.85" />
          <rect x="-340" y="481" width="1160" height="9" fill={dark} opacity="0.85" />
          <rect x="-340" y="306" width="1160" height="2" fill={dark} opacity="0.6" />
          <rect x="-340" y="472" width="1160" height="2" fill={dark} opacity="0.6" />
          <rect x="-340" y="515" width="1160" height="34" fill={`url(#zari-${uid})`} />
          <rect x="-340" y="515" width="1160" height="34" fill={`url(#motif-${uid})`} opacity="0.4" />
          <rect x="-340" y="515" width="1160" height="3" fill={dark} opacity="0.8" />
          <rect x="-340" y="546" width="1160" height="3" fill={dark} opacity="0.8" />
          <rect x="-340" y="200" width="1160" height="22" fill={`url(#zari-${uid})`} opacity="0.9" />
        </g>

        {/* Soft pleats */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = -140 + i * 74;
          return (
            <path
              key={i}
              d={`M${x} -60 L${x + 52} -60 L${x - 40} 700 L${x - 92} 700Z`}
              fill={`url(#${i % 2 ? "foldLight" : "foldDark"}-${uid})`}
            />
          );
        })}
      </g>

      <rect width="480" height="640" fill={`url(#vig-${uid})`} />
    </svg>
  );
};

/* =====================================================
   SAREE SHOWCASE (right side)
===================================================== */

const DUST = [
  { x: "8%", s: "5px", d: "9s", delay: "0s" },
  { x: "20%", s: "3px", d: "12s", delay: "2s" },
  { x: "33%", s: "6px", d: "10s", delay: "4s" },
  { x: "47%", s: "4px", d: "13s", delay: "1s" },
  { x: "58%", s: "3px", d: "9.5s", delay: "5s" },
  { x: "70%", s: "5px", d: "11s", delay: "3s" },
  { x: "82%", s: "4px", d: "12.5s", delay: "6s" },
  { x: "92%", s: "6px", d: "10.5s", delay: "2.5s" },
];

const ContactMainShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const currentRef = useRef(0);
  const visualRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const changeSlide = useCallback((next) => {
    if (next === currentRef.current) return;
    setPrevious(currentRef.current);
    currentRef.current = next;
    setCurrent(next);
  }, []);

  /* Auto-advance */
  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = setInterval(
      () => changeSlide((currentRef.current + 1) % SAREE_SLIDES.length),
      5600
    );
    return () => clearInterval(timer);
  }, [paused, reducedMotion, changeSlide]);

  /* Remove the outgoing slide once its fade finishes */
  useEffect(() => {
    if (previous === null) return undefined;
    const timer = setTimeout(() => setPrevious(null), 1500);
    return () => clearTimeout(timer);
  }, [previous]);

  /* Gentle 3D tilt that follows the pointer */
  const handleMove = (event) => {
    if (reducedMotion) return;
    const node = visualRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--ContactMain-tilt-x", `${(-y * 5).toFixed(2)}deg`);
    node.style.setProperty("--ContactMain-tilt-y", `${(x * 7).toFixed(2)}deg`);
    node.style.setProperty("--ContactMain-shift-x", `${(x * -12).toFixed(1)}px`);
    node.style.setProperty("--ContactMain-shift-y", `${(y * -10).toFixed(1)}px`);
  };

  const handleLeave = () => {
    const node = visualRef.current;
    if (node) {
      ["tilt-x", "tilt-y", "shift-x", "shift-y"].forEach((key) =>
        node.style.removeProperty(`--ContactMain-${key}`)
      );
    }
    setPaused(false);
  };

  const activeSlides = [previous, current].filter((value) => value !== null);

  return (
    <aside
      className="ContactMain-visual"
      ref={visualRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleLeave}
      aria-label="Handwoven saree showcase"
    >
      {/* Clip paths (hidden) */}
      <svg className="ContactMain-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="ContactMainArchDesktop" clipPathUnits="objectBoundingBox">
            <path d="M0.12,1 L0.12,0.66 C0.02,0.62 0.02,0.50 0.12,0.46 C0.02,0.42 0.02,0.30 0.12,0.26 C0.06,0.20 0.08,0.08 0.20,0.05 C0.26,0.03 0.30,0.02 0.34,0 L1,0 L1,1 Z" />
          </clipPath>
          <clipPath id="ContactMainArchMobile" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.20 C0,0.14 0.04,0.12 0.10,0.10 C0.18,0.08 0.20,0.05 0.28,0.03 C0.36,0.01 0.42,0.04 0.50,0 C0.58,0.04 0.64,0.01 0.72,0.03 C0.80,0.05 0.82,0.08 0.90,0.10 C0.96,0.12 1,0.14 1,0.20 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="ContactMain-frame">
        <div className="ContactMain-slides">
          {activeSlides.map((index) => {
            const slide = SAREE_SLIDES[index];
            return (
              <div
                key={index}
                className={`ContactMain-slide ${
                  index === current
                    ? "ContactMain-slide-active"
                    : "ContactMain-slide-leaving"
                }`}
              >
                <SareeArt
                  palette={slide.palette}
                  uid={`s${index}`}
                  label={`${slide.name} saree, ${slide.detail}`}
                />
              </div>
            );
          })}
        </div>

        <span className="ContactMain-sheen" aria-hidden="true" />

        {DUST.map((dust, i) => (
          <span
            key={i}
            className="ContactMain-dust"
            aria-hidden="true"
            style={{
              "--ContactMain-x": dust.x,
              "--ContactMain-size": dust.s,
              "--ContactMain-duration": dust.d,
              "--ContactMain-delay": dust.delay,
            }}
          />
        ))}

        <Jasmine className="ContactMain-jasmine ContactMain-jasmine-one" />
        <Jasmine className="ContactMain-jasmine ContactMain-jasmine-two" />
        <Jasmine className="ContactMain-jasmine ContactMain-jasmine-three" />
      </div>

      {/* Gold outlines that follow the arch */}
      <svg
        className="ContactMain-outline ContactMain-outline-desktop"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0.12,1 L0.12,0.66 C0.02,0.62 0.02,0.50 0.12,0.46 C0.02,0.42 0.02,0.30 0.12,0.26 C0.06,0.20 0.08,0.08 0.20,0.05 C0.26,0.03 0.30,0.02 0.34,0"
          fill="none"
          stroke="#e6d3ad"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          transform="translate(0.014 0)"
          d="M0.12,1 L0.12,0.66 C0.02,0.62 0.02,0.50 0.12,0.46 C0.02,0.42 0.02,0.30 0.12,0.26 C0.06,0.20 0.08,0.08 0.20,0.05 C0.26,0.03 0.30,0.02 0.34,0"
          fill="none"
          stroke="#c39a4f"
          strokeWidth="1"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="ContactMain-outline ContactMain-outline-mobile"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0,1 L0,0.20 C0,0.14 0.04,0.12 0.10,0.10 C0.18,0.08 0.20,0.05 0.28,0.03 C0.36,0.01 0.42,0.04 0.50,0 C0.58,0.04 0.64,0.01 0.72,0.03 C0.80,0.05 0.82,0.08 0.90,0.10 C0.96,0.12 1,0.14 1,0.20 L1,1"
          fill="none"
          stroke="#e6d3ad"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Tag card */}
      <div className="ContactMain-tag">
        <Ornament className="ContactMain-tag-ornament" />
        <span>Tradition</span>
        <span>in every</span>
        <span>weave</span>
      </div>

      {/* Caption + dots */}
      <div className="ContactMain-caption">
        <div className="ContactMain-caption-text" key={current}>
          <strong>{SAREE_SLIDES[current].name}</strong>
          <span>{SAREE_SLIDES[current].detail}</span>
        </div>

        <div className="ContactMain-dots" role="tablist" aria-label="Choose saree">
          {SAREE_SLIDES.map((slide, index) => (
            <button
              key={slide.name}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Show ${slide.name}`}
              className={`ContactMain-dot ${index === current ? "ContactMain-dot-active" : ""}`}
              onClick={() => changeSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Brand card */}
      <div className="ContactMain-brandcard">
        <Lotus className="ContactMain-brandcard-lotus" />
        <strong>ODC-HANDLOOM</strong>
        <span>Weaving Heritage</span>
        <Ornament className="ContactMain-brandcard-ornament" />
      </div>
    </aside>
  );
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

const ContactMain = ({ onSubmit }) => {
  const heroRef = useRef(null);
  const locationRef = useRef(null);
  const formRef = useRef(null);
  const copyTimer = useRef(null);

  const heroInView = useInView(heroRef);
  const locationInView = useInView(locationRef);

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [sentName, setSentName] = useState("");

  const [mapType, setMapType] = useState("map");
  const [isOpen, setIsOpen] = useState(getStoreStatus);
  const [copied, setCopied] = useState(false);

  /* Live store status */
  useEffect(() => {
    const timer = setInterval(() => setIsOpen(getStoreStatus()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  /* ---------- Form ---------- */

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      if (typeof onSubmit === "function") {
        await onSubmit(values);
      } else {
        /* 👉 Replace this with your own API call, e.g.
           await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) }) */
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setSentName(values.name.trim().split(" ")[0]);
      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setSentName("");
  };

  /* ---------- Location actions ---------- */

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

  const scrollToLocation = (event) => {
    event.preventDefault();
    locationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const infoItems = [
    {
      icon: <FiPhone />,
      title: "Call Us",
      main: STORE.phone,
      sub: "Mon - Sat, 10 AM - 7 PM",
      href: `tel:${STORE.phoneHref}`,
    },
    {
      icon: <FiMail />,
      title: "Email Us",
      main: STORE.email,
      sub: "We reply within 24 hours",
      href: `mailto:${STORE.email}`,
    },
    {
      icon: <FiMapPin />,
      title: "Visit Our Store",
      main: "Bhubaneswar, Odisha, India",
      sub: "Experience our collections in person",
      href: "#ContactMain-location",
      onClick: scrollToLocation,
    },
    {
      icon: <FiMessageCircle />,
      title: "Live Chat",
      main: "Chat with our support team",
      sub: "Available on website",
      href: `https://wa.me/${STORE.whatsapp}`,
      external: true,
    },
  ];

  const fieldClass = (name) =>
    `ContactMain-field ${errors[name] ? "ContactMain-field-error" : ""}`;

  const describe = (name) => (errors[name] ? `ContactMain-error-${name}` : undefined);

  return (
    <section className="ContactMain" aria-label="Contact ODC Handloom">
      {/* ===================== HERO ===================== */}
      <div
        className={`ContactMain-hero ${heroInView ? "ContactMain-inview" : ""}`}
        ref={heroRef}
      >
        {/* Decorative vertical spine */}
        <div className="ContactMain-spine" aria-hidden="true">
          <Ornament className="ContactMain-spine-ornament" />
          <Ornament className="ContactMain-spine-ornament ContactMain-spine-ornament-two" />
        </div>

        <div className="ContactMain-content">
          <div className="ContactMain-eyebrow ContactMain-reveal" style={{ "--ContactMain-i": 0 }}>
            <span>Get in Touch</span>
            <span className="ContactMain-eyebrow-line">
              <i />
              <Ornament />
              <i />
            </span>
          </div>

          <h2 className="ContactMain-title ContactMain-reveal" style={{ "--ContactMain-i": 1 }}>
            We&rsquo;d Love to
            <em>Hear From You</em>
          </h2>

          <p className="ContactMain-lead ContactMain-reveal" style={{ "--ContactMain-i": 2 }}>
            Have a question about our sarees, need styling advice, or want to know more
            about our collections? Our team is here to help you.
          </p>

          <div className="ContactMain-body">
            {/* Contact info */}
            <ul className="ContactMain-info">
              {infoItems.map((item, index) => (
                <li
                  key={item.title}
                  className="ContactMain-reveal"
                  style={{ "--ContactMain-i": 3 + index }}
                >
                  <a
                    className="ContactMain-info-item"
                    href={item.href}
                    onClick={item.onClick}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    <span className="ContactMain-info-icon">{item.icon}</span>
                    <span className="ContactMain-info-text">
                      <strong>{item.title}</strong>
                      <span className="ContactMain-info-main">{item.main}</span>
                      <small>{item.sub}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Form */}
            <div className="ContactMain-card ContactMain-reveal" style={{ "--ContactMain-i": 5 }}>
              <Ornament className="ContactMain-card-ornament" />

              {status === "success" ? (
                <div className="ContactMain-success" role="status" aria-live="polite">
                  <span className="ContactMain-success-icon">
                    <FiCheck />
                  </span>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you{sentName ? `, ${sentName}` : ""}. Our team will get back to you
                    within 24 hours.
                  </p>
                  <button type="button" className="ContactMain-success-button" onClick={resetForm}>
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="ContactMain-card-title">Send Us a Message</h3>
                  <p className="ContactMain-card-text">
                    Fill out the form and we&rsquo;ll get back to you soon.
                  </p>

                  <form className="ContactMain-form" onSubmit={handleSubmit} noValidate ref={formRef}>
                    <div className="ContactMain-row">
                      <div className={fieldClass("name")}>
                        <FiUser className="ContactMain-field-icon" />
                        <input
                          id="ContactMain-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your Name *"
                          aria-label="Your name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={describe("name")}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && (
                          <span id="ContactMain-error-name" className="ContactMain-error">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className={fieldClass("email")}>
                        <FiMail className="ContactMain-field-icon" />
                        <input
                          id="ContactMain-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="Your Email *"
                          aria-label="Your email"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={describe("email")}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && (
                          <span id="ContactMain-error-email" className="ContactMain-error">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ContactMain-row">
                      <div className={fieldClass("phone")}>
                        <FiPhone className="ContactMain-field-icon" />
                        <input
                          id="ContactMain-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="Phone Number"
                          aria-label="Phone number"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={describe("phone")}
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.phone && (
                          <span id="ContactMain-error-phone" className="ContactMain-error">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      <div className={fieldClass("subject")}>
                        <FiTag className="ContactMain-field-icon" />
                        <select
                          id="ContactMain-subject"
                          name="subject"
                          aria-label="Subject"
                          aria-invalid={Boolean(errors.subject)}
                          aria-describedby={describe("subject")}
                          className={values.subject ? "" : "ContactMain-select-empty"}
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled>
                            Select Subject
                          </option>
                          {SUBJECTS.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className="ContactMain-select-arrow" />
                        {errors.subject && (
                          <span id="ContactMain-error-subject" className="ContactMain-error">
                            {errors.subject}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`${fieldClass("message")} ContactMain-field-area`}>
                      <FiMessageCircle className="ContactMain-field-icon" />
                      <textarea
                        id="ContactMain-message"
                        name="message"
                        rows="4"
                        placeholder="Your Message *"
                        aria-label="Your message"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={describe("message")}
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.message && (
                        <span id="ContactMain-error-message" className="ContactMain-error">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {status === "error" && (
                      <p className="ContactMain-alert" role="alert">
                        Something went wrong. Please try again or email us at {STORE.email}.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="ContactMain-submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <>
                          <span className="ContactMain-spinner" aria-hidden="true" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiArrowRight />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <ContactMainShowcase />
      </div>

      {/* ===================== LOCATION ===================== */}
      <section
        className={`ContactMain-location ${locationInView ? "ContactMain-inview" : ""}`}
        id="ContactMain-location"
        ref={locationRef}
        aria-labelledby="ContactMain-location-title"
      >
        <div className="ContactMain-location-head ContactMain-reveal" style={{ "--ContactMain-i": 0 }}>
          <div className="ContactMain-eyebrow ContactMain-eyebrow-center">
            <span className="ContactMain-eyebrow-line">
              <i />
              <Ornament />
              <i />
            </span>
            <span>Find Us</span>
            <span className="ContactMain-eyebrow-line">
              <i />
              <Ornament />
              <i />
            </span>
          </div>

          <h2 className="ContactMain-location-title" id="ContactMain-location-title">
            Visit Our <em>Store</em>
          </h2>
          <p className="ContactMain-location-text">
            Feel the fabric, see the zari up close and let our team help you choose the
            perfect weave.
          </p>
        </div>

        <div className="ContactMain-location-grid">
          {/* Store details */}
          <div className="ContactMain-store ContactMain-reveal" style={{ "--ContactMain-i": 1 }}>
            <div className="ContactMain-store-top">
              <span className="ContactMain-store-badge">
                <FiMapPin />
              </span>
              <div>
                <h3 className="ContactMain-store-name">{STORE.name}</h3>
                <span
                  className={`ContactMain-status ${
                    isOpen ? "ContactMain-status-open" : "ContactMain-status-closed"
                  }`}
                >
                  <i />
                  {isOpen ? "Open now" : "Closed now"}
                </span>
              </div>
            </div>

            <address className="ContactMain-address">
              {STORE.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <ul className="ContactMain-store-list">
              <li>
                <FiPhone />
                <a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a>
              </li>
              <li>
                <FiMail />
                <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
              </li>
              <li className="ContactMain-store-hours">
                <FiClock />
                <div>
                  {STORE.hours.map((slot) => (
                    <p key={slot.days}>
                      <span>{slot.days}</span>
                      <strong>{slot.time}</strong>
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="ContactMain-actions">
              <a
                className="ContactMain-action ContactMain-action-primary"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
              >
                <FiNavigation />
                <span>Get Directions</span>
              </a>

              <a
                className="ContactMain-action"
                href={OPEN_MAP_URL}
                target="_blank"
                rel="noreferrer"
              >
                <FiExternalLink />
                <span>Open in Maps</span>
              </a>

              <button type="button" className="ContactMain-action" onClick={handleCopy}>
                {copied ? <FiCheck /> : <FiCopy />}
                <span>{copied ? "Copied!" : "Copy Address"}</span>
              </button>

              <a className="ContactMain-action" href={`tel:${STORE.phoneHref}`}>
                <FiPhone />
                <span>Call Store</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="ContactMain-map ContactMain-reveal" style={{ "--ContactMain-i": 2 }}>
            <div className="ContactMain-map-toggle" role="tablist" aria-label="Map view">
              <button
                type="button"
                role="tab"
                aria-selected={mapType === "map"}
                className={mapType === "map" ? "ContactMain-map-toggle-active" : ""}
                onClick={() => setMapType("map")}
              >
                Map
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mapType === "satellite"}
                className={mapType === "satellite" ? "ContactMain-map-toggle-active" : ""}
                onClick={() => setMapType("satellite")}
              >
                Satellite
              </button>
            </div>

            <Ornament className="ContactMain-map-ornament ContactMain-map-ornament-one" />
            <Ornament className="ContactMain-map-ornament ContactMain-map-ornament-two" />

            <div className="ContactMain-map-frame">
              <iframe
                key={mapType}
                title={`${STORE.name} location map`}
                src={getMapSrc(mapType)}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactMain;