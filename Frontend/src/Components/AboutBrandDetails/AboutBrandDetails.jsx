import React, { useEffect, useRef, useState } from "react";
import "./AboutBrandDetails.css";

/* =========================
   STATISTICS
========================= */

const STATS = [
  {
    icon: "rosette",
    value: 100,
    title: "Textile Clusters",
    text: ["Sourcing from diverse", "weaving regions"],
  },
  {
    icon: "knot",
    value: 5000,
    title: "Artisans Empowered",
    text: ["Supporting traditional", "weavers across India"],
  },
  {
    icon: "lotus",
    value: 200,
    title: "Unique Weaves",
    text: ["Curated handlooms", "for every occasion"],
  },
  {
    icon: "store",
    value: 50,
    title: "Stores Across India",
    text: ["Bringing heritage", "closer to you"],
  },
];

const PILLARS = [
  {
    icon: "hand",
    title: "Our Philosophy",
    text: [
      "We believe in preserving India's handloom traditions while creating contemporary designs for today's women.",
      "Every saree tells a story — of people, places and a timeless culture.",
    ],
  },
  {
    icon: "gem",
    title: "Our Commitment",
    text: [
      "From sourcing the finest natural fabrics to working with master artisans, we are committed to quality, authenticity and sustainable practices.",
    ],
  },
  {
    icon: "people",
    title: "Empowering Communities",
    text: [
      "We work closely with weavers and artisan communities across India, helping to preserve their craft, create livelihood opportunities and keep traditional weaving techniques alive.",
    ],
  },
  {
    icon: "lotus",
    title: "A Sustainable Tomorrow",
    text: [
      "Our focus is on ethical fashion, natural fabrics and responsible sourcing — ensuring that the beauty of Indian handlooms continues for generations to come.",
    ],
  },
];

/* =========================
   VIEWPORT ANIMATION
========================= */

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
      { threshold: 0.08 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);

  return inView;
};

/* =========================
   COUNT-UP ANIMATION
========================= */

const useCountUp = (target, active, duration = 1500) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValue(target);
      return undefined;
    }

    let frame;

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
};

/* =========================
   DECORATIVE ORNAMENT
========================= */

const Ornament = ({ className = "" }) => (
  <svg
    className={`AboutBrandDetails-ornament ${className}`}
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

/* =========================
   LOTUS BACKGROUND ART
========================= */

const LotusArt = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 200 190"
    aria-hidden="true"
    focusable="false"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {[-70, -46, -23, 0, 23, 46, 70].map((angle) => (
        <path
          key={angle}
          d="M100 150C72 124 70 74 100 30 130 74 128 124 100 150Z"
          transform={`rotate(${angle} 100 150)`}
        />
      ))}

      {[-58, -34, -12, 12, 34, 58].map((angle) => (
        <path
          key={`inner-${angle}`}
          d="M100 150C86 132 86 104 100 80 114 104 114 132 100 150Z"
          transform={`rotate(${angle} 100 150)`}
          opacity="0.6"
        />
      ))}

      <path d="M100 150V186" />
    </g>
  </svg>
);

/* =========================
   SVG ICONS
========================= */

const Icon = ({ type }) => {
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

  switch (type) {
    case "rosette":
      return (
        <svg {...common}>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <path
              key={angle}
              d="M24 24C19 20 19 11 24 6 29 11 29 20 24 24Z"
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="3" />
          <path
            d="M24 15v-3M24 36v-3M15 24h-3M36 24h-3"
            opacity="0.6"
          />
        </svg>
      );

    case "knot":
      return (
        <svg {...common}>
          <path d="M24 6l10 10-10 10-10-10Z" />
          <path d="M24 22l10 10-10 10-10-10Z" />
          <path d="M14 16l-8 8 8 8M34 16l8 8-8 8" />
          <path d="M24 13l3 3-3 3-3-3ZM24 29l3 3-3 3-3-3Z" />
        </svg>
      );

    case "lotus":
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

    case "store":
      return (
        <svg {...common}>
          <path d="M8 18 11 8h26l3 10" />
          <path d="M8 18c0 3 3 5 5.3 5s5.4-2 5.4-5c0 3 3 5 5.3 5s5.3-2 5.3-5c0 3 3 5 5.4 5S40 21 40 18" />
          <path d="M10 23v17h28V23" />
          <path d="M20 40V30h8v10" />
          <path d="M13 28h4v4h-4ZM31 28h4v4h-4Z" />
        </svg>
      );

    case "hand":
      return (
        <svg {...common}>
          <path d="M24 9c6 2 9 8 7 14-6-1-10-6-7-14Z" />
          <path d="M24 9v15" />
          <path d="M7 34c5 0 8-2 11-4h8c2 0 3 2 1 3l-9 5H7" />
          <path d="M28 30l9-3c2-1 4 1 2 3l-7 5" />
        </svg>
      );

    case "gem":
      return (
        <svg {...common}>
          <path d="M14 11h20l8 10-18 20L6 21Z" />
          <path d="M6 21h36" />
          <path d="M18 11l-4 10 10 20 10-20-4-10" />
          <path d="M14 21l10-10 10 10" />
        </svg>
      );

    case "people":
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

    default:
      return null;
  }
};

/* =========================
   STATISTICS ITEM
========================= */

const AboutBrandDetailsStat = ({ stat, index, active }) => {
  const count = useCountUp(stat.value, active, 1400 + index * 180);

  return (
    <li
      className="AboutBrandDetails-stat AboutBrandDetails-reveal"
      style={{ "--AboutBrandDetails-i": 4 + index }}
    >
      <span className="AboutBrandDetails-stat-icon">
        <Icon type={stat.icon} />
      </span>

      <strong className="AboutBrandDetails-stat-value">
        <span aria-label={`${stat.value}+`}>{count}+</span>
      </strong>

      <h3 className="AboutBrandDetails-stat-title">{stat.title}</h3>

      <p className="AboutBrandDetails-stat-text">
        {stat.text.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </li>
  );
};

/* =========================
   MAIN COMPONENT
========================= */

const AboutBrandDetails = () => {
  const rootRef = useRef(null);
  const inView = useInView(rootRef);

  return (
    <section
      className={`AboutBrandDetails ${
        inView ? "AboutBrandDetails-inview" : ""
      }`}
      ref={rootRef}
      aria-labelledby="AboutBrandDetails-title"
    >
      {/* Decorative maroon strip */}
      <div className="AboutBrandDetails-strip" aria-hidden="true">
        <Ornament className="AboutBrandDetails-strip-ornament AboutBrandDetails-strip-ornament-top" />
        <Ornament className="AboutBrandDetails-strip-ornament AboutBrandDetails-strip-ornament-bottom" />
        <span className="AboutBrandDetails-strip-sheen" />
      </div>

      {/* Left gold spine */}
      <div className="AboutBrandDetails-spine" aria-hidden="true">
        <i className="AboutBrandDetails-spine-line" />
        <i className="AboutBrandDetails-gem" />
        <i className="AboutBrandDetails-gem AboutBrandDetails-gem-small" />
      </div>

      {/* Right-side decoration */}
      <div className="AboutBrandDetails-edge" aria-hidden="true">
        <i className="AboutBrandDetails-edge-line" />
        <Ornament className="AboutBrandDetails-edge-ornament" />
        <i className="AboutBrandDetails-edge-line AboutBrandDetails-edge-line-short" />

        <p>
          <span>Indian</span>
          <span>Crafts</span>
          <span>Forever</span>
        </p>
      </div>

      {/* Background artwork */}
      <LotusArt className="AboutBrandDetails-lotus AboutBrandDetails-lotus-left" />
      <LotusArt className="AboutBrandDetails-lotus AboutBrandDetails-lotus-right" />

      <div className="AboutBrandDetails-inner">
        {/* Left column */}
        <div className="AboutBrandDetails-main">
          <div
            className="AboutBrandDetails-eyebrow AboutBrandDetails-reveal"
            style={{ "--AboutBrandDetails-i": 0 }}
          >
            <span>About Our Brand</span>

            <span className="AboutBrandDetails-line-ornament">
              <i />
              <Ornament />
              <i />
            </span>
          </div>

          <h2
            className="AboutBrandDetails-title AboutBrandDetails-reveal"
            id="AboutBrandDetails-title"
            style={{ "--AboutBrandDetails-i": 1 }}
          >
            A Legacy Woven
            <em>for Generations</em>
          </h2>

          <div
            className="AboutBrandDetails-line-ornament AboutBrandDetails-title-divider AboutBrandDetails-reveal"
            style={{ "--AboutBrandDetails-i": 2 }}
            aria-hidden="true"
          >
            <i />
            <Ornament />
            <i />
          </div>

          <p
            className="AboutBrandDetails-text AboutBrandDetails-reveal"
            style={{ "--AboutBrandDetails-i": 3 }}
          >
            ODC-HANDLOOM is a celebration of India&rsquo;s rich textile
            heritage. Our sarees are crafted by skilled artisans using pure
            and natural fabrics, traditional techniques and timeless designs.
            We strive to bring the elegance, culture and craftsmanship of
            Indian handlooms to every woman&rsquo;s wardrobe.
          </p>

          <ul className="AboutBrandDetails-stats">
            {STATS.map((stat, index) => (
              <AboutBrandDetailsStat
                key={stat.title}
                stat={stat}
                index={index}
                active={inView}
              />
            ))}
          </ul>
        </div>

        {/* Right column */}
        <ul className="AboutBrandDetails-pillars">
          {PILLARS.map((pillar, index) => (
            <li
              key={pillar.title}
              className="AboutBrandDetails-pillar AboutBrandDetails-reveal"
              style={{ "--AboutBrandDetails-i": 2 + index * 2 }}
            >
              <span className="AboutBrandDetails-pillar-icon">
                <Icon type={pillar.icon} />
              </span>

              <div className="AboutBrandDetails-pillar-body">
                <h3 className="AboutBrandDetails-pillar-title">
                  {pillar.title}
                </h3>

                {pillar.text.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="AboutBrandDetails-pillar-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {index < PILLARS.length - 1 && (
                <span
                  className="AboutBrandDetails-pillar-divider"
                  aria-hidden="true"
                >
                  <i />
                  <b />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutBrandDetails;