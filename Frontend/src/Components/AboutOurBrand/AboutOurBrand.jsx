import React, { useEffect, useRef, useState } from "react";

import "./AboutOurBrand.css";
import brandImageOne from "../../assets/collection-3.png";
import brandImageTwo from "../../assets/collection-4.png";
import brandImageThree from "../../assets/collection-2.png";
import brandImageFour from "../../assets/collection-6.png";

/* =====================================================
   DATA
===================================================== */

const TILES = [
  {
    variant: "one",
    src: brandImageOne,
    alt: "ODC Handloom saree – featured look one",
    position: "50% 25%",
  },
  {
    variant: "two",
    src: brandImageTwo,
    alt: "ODC Handloom saree – featured look two",
    position: "50% 22%",
  },
  {
    variant: "three",
    src: brandImageThree,
    alt: "ODC Handloom saree – featured look three",
    position: "45% 28%",
  },
  {
    variant: "four",
    src: brandImageFour,
    alt: "ODC Handloom saree – featured look four",
    position: "50% 30%",
  },
];

const FEATURES = [
  {
    icon: "lotus",
    title: ["Authentic", "Handlooms"],
    text: ["Preserving India's", "rich heritage."],
  },
  {
    icon: "leaf",
    title: ["Pure & Natural", "Fabrics"],
    text: ["Comfortable,", "meaningful, timeless."],
  },
  {
    icon: "people",
    title: ["Supporting", "Artisans"],
    text: ["Empowering weavers", "across India."],
  },
  {
    icon: "gem",
    title: ["Sustainable", "Fashion"],
    text: ["A better tomorrow", "through tradition."],
  },
];

const DUST = [
  { x: "12%", s: "5px", d: "11s", delay: "0s" },
  { x: "28%", s: "3px", d: "14s", delay: "3s" },
  { x: "46%", s: "6px", d: "12s", delay: "5s" },
  { x: "63%", s: "4px", d: "13s", delay: "1.5s" },
  { x: "78%", s: "3px", d: "10.5s", delay: "6s" },
  { x: "92%", s: "5px", d: "12.5s", delay: "2.5s" },
];

/* =====================================================
   HELPERS
===================================================== */

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
      { threshold: 0.14 }
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
    className={`AboutOurBrand-ornament ${className}`}
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

/* Large line-art lotus used as a faint background flourish */
const LotusArt = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 190" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
      {[-70, -46, -23, 0, 23, 46, 70].map((angle) => (
        <path
          key={angle}
          d="M100 150C72 124 70 74 100 30 130 74 128 124 100 150Z"
          transform={`rotate(${angle} 100 150)`}
          opacity={angle === 0 ? 1 : 0.8}
        />
      ))}
      {[-58, -34, -12, 12, 34, 58].map((angle) => (
        <path
          key={`i${angle}`}
          d="M100 150C86 132 86 104 100 80 114 104 114 132 100 150Z"
          transform={`rotate(${angle} 100 150)`}
          opacity="0.6"
        />
      ))}
      <path d="M100 150V186" />
      <path d="M100 168C84 166 72 172 62 182M100 172C116 170 130 176 140 184" />
    </g>
  </svg>
);

/* Detailed lotus for the centre medallion */
const MedallionLotus = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M32 32C26 26 26 16 32 7 38 16 38 26 32 32Z"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((angle) => (
        <path
          key={angle}
          d="M32 32C29 28 29 22 32 17 35 22 35 28 32 32Z"
          transform={`rotate(${angle} 32 32)`}
          opacity="0.7"
        />
      ))}
      <circle cx="32" cy="32" r="2.4" fill="currentColor" stroke="none" />
    </g>
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

  if (type === "lotus") {
    return (
      <svg {...common}>
        <path d="M24 8c-5 6-5 14 0 22 5-8 5-16 0-22Z" />
        <path d="M24 30c-8-2-13-9-12-17 6 3 10 9 12 17Z" />
        <path d="M24 30c8-2 13-9 12-17-6 3-10 9-12 17Z" />
        <path d="M24 30c-10 2-17-2-20-9 7-1 15 2 20 9Z" />
        <path d="M24 30c10 2 17-2 20-9-7-1-15 2-20 9Z" />
        <path d="M14 36c6 4 14 4 20 0" />
      </svg>
    );
  }

  if (type === "leaf") {
    return (
      <svg {...common}>
        <path d="M10 38C10 20 22 9 40 9 40 28 29 38 10 38Z" />
        <path d="M10 38 30 18" />
        <path d="M20 29h8M25 24h7" />
      </svg>
    );
  }

  if (type === "people") {
    return (
      <svg {...common}>
        <circle cx="24" cy="15" r="5" />
        <path d="M14 36c0-6 4-10 10-10s10 4 10 10" />
        <circle cx="10" cy="20" r="3.6" />
        <path d="M3 35c0-4.5 3-7.5 7-7.5" />
        <circle cx="38" cy="20" r="3.6" />
        <path d="M45 35c0-4.5-3-7.5-7-7.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M14 11h20l8 10-18 20L6 21Z" />
      <path d="M6 21h36" />
      <path d="M18 11l-4 10 10 20 10-20-4-10" />
      <path d="M14 21l10-10 10 10" />
    </svg>
  );
};

/* =====================================================
   IMAGE TILE
===================================================== */

const AboutOurBrandTile = ({ tile, index }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`AboutOurBrand-cell AboutOurBrand-cell-${tile.variant}`}
      style={{ "--AboutOurBrand-i": index }}
    >
      <figure className="AboutOurBrand-tile">
        <div className="AboutOurBrand-tile-parallax">
          {failed ? (
            <div className="AboutOurBrand-tile-fallback" aria-hidden="true" />
          ) : (
            <img
              className="AboutOurBrand-tile-img"
              src={tile.src}
              alt={tile.alt}
              loading="lazy"
              style={{ objectPosition: tile.position }}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <span className="AboutOurBrand-tile-shade" aria-hidden="true" />
        <span className="AboutOurBrand-tile-sheen" aria-hidden="true" />
      </figure>
    </div>
  );
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

const AboutOurBrand = () => {
  const innerRef = useRef(null);
  const collageRef = useRef(null);
  const inView = useInView(innerRef);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMove = (event) => {
    if (reducedMotion) return;
    const node = collageRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--AboutOurBrand-px", x.toFixed(3));
    node.style.setProperty("--AboutOurBrand-py", y.toFixed(3));
  };

  const handleLeave = () => {
    const node = collageRef.current;
    if (!node) return;
    node.style.setProperty("--AboutOurBrand-px", "0");
    node.style.setProperty("--AboutOurBrand-py", "0");
  };

  return (
    <section className="AboutOurBrand" aria-labelledby="AboutOurBrand-title">
      <div
        className={`AboutOurBrand-inner ${inView ? "AboutOurBrand-inview" : ""}`}
        ref={innerRef}
      >
        {/* ---------- Collage (left) ---------- */}
        <div
          className="AboutOurBrand-collage"
          ref={collageRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {/* Maroon tag */}
          <div className="AboutOurBrand-tag-pos">
            <div className="AboutOurBrand-tag">
              <span>Tradition</span>
              <span>in every</span>
              <span>weave</span>
              <i className="AboutOurBrand-tag-line" />
              <Ornament className="AboutOurBrand-tag-ornament" />
              <i className="AboutOurBrand-tag-line" />
            </div>
          </div>

          <div className="AboutOurBrand-grid">
            {TILES.map((tile, index) => (
              <AboutOurBrandTile key={tile.variant} tile={tile} index={index} />
            ))}
          </div>

          {/* Gold dust */}
          {DUST.map((dust, i) => (
            <span
              key={i}
              className="AboutOurBrand-dust"
              aria-hidden="true"
              style={{
                "--AboutOurBrand-x": dust.x,
                "--AboutOurBrand-size": dust.s,
                "--AboutOurBrand-duration": dust.d,
                "--AboutOurBrand-delay": dust.delay,
              }}
            />
          ))}

          {/* Centre medallion */}
          <div className="AboutOurBrand-medallion-pos" aria-hidden="true">
            <div className="AboutOurBrand-medallion">
              <span className="AboutOurBrand-medallion-ring" />
              <MedallionLotus className="AboutOurBrand-medallion-lotus" />
            </div>
          </div>

          <span className="AboutOurBrand-edge" aria-hidden="true">
            <Ornament />
          </span>
        </div>

        {/* ---------- Content (right) ---------- */}
        <div className="AboutOurBrand-content">
          <LotusArt className="AboutOurBrand-lotus-art" />

          <div className="AboutOurBrand-eyebrow AboutOurBrand-reveal" style={{ "--AboutOurBrand-i": 0 }}>
            <span>About Our Brand</span>
            <span className="AboutOurBrand-eyebrow-line">
              <i />
              <Ornament />
              <i />
            </span>
          </div>

          <h2
            className="AboutOurBrand-title AboutOurBrand-reveal"
            id="AboutOurBrand-title"
            style={{ "--AboutOurBrand-i": 1 }}
          >
            The Story of
            <em>ODC-HANDLOOM</em>
          </h2>

          <p className="AboutOurBrand-text AboutOurBrand-reveal" style={{ "--AboutOurBrand-i": 2 }}>
            ODC-HANDLOOM brings you the timeless beauty of Indian sarees, crafted with love,
            care and deep respect for our rich textile tradition. Our collections are woven by
            skilled artisans from across India, using pure and natural fabrics that reflect the
            elegance of our heritage.
          </p>

          <p className="AboutOurBrand-text AboutOurBrand-reveal" style={{ "--AboutOurBrand-i": 3 }}>
            From classic handloom sarees to contemporary ethnic wear, we curate every piece to
            celebrate the artistry, culture and craftsmanship of India. At ODC-HANDLOOM, we
            believe a saree is not just an outfit &mdash; it&rsquo;s a story of tradition, a
            symbol of grace, and a legacy that lives on.
          </p>

          <ul className="AboutOurBrand-features">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.icon}
                className="AboutOurBrand-feature AboutOurBrand-reveal"
                style={{ "--AboutOurBrand-i": 4 + index }}
              >
                <span className="AboutOurBrand-feature-icon">
                  <FeatureIcon type={feature.icon} />
                </span>

                <h3 className="AboutOurBrand-feature-title">
                  {feature.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>

                <p className="AboutOurBrand-feature-text">
                  {feature.text.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutOurBrand;