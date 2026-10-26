import React, { useEffect, useRef, useState } from "react";
import {
  UsersRound,
  Flower2,
  MapPinned,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import sareeImage from "../../assets/collection-1.png";
import "./AboutMain.css";

const AboutMain = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  const heritageStats = [
    {
      value: 100,
      suffix: "+",
      label: "Textile Clusters",
      icon: UsersRound,
    },
    {
      value: 5000,
      suffix: "+",
      label: "Artisans Empowered",
      icon: UsersRound,
    },
    {
      value: 200,
      suffix: "+",
      label: "Unique Weaves",
      icon: Sparkles,
    },
  ];

  // Reveal the page and animate statistics when it enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Smoothly count the numbers from zero to their final values.
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const startTime = performance.now();
    let frameId;

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCounts(
        heritageStats.map((stat) =>
          Math.round(stat.value * easedProgress)
        )
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  return (
    <section
      className={`AboutMain ${
        isVisible ? "AboutMain--visible" : ""
      }`}
      ref={sectionRef}
      aria-labelledby="AboutMain-heading"
    >
      {/* Decorative background elements */}
      <div
        className="AboutMain__decoration AboutMain__decoration--top"
        aria-hidden="true"
      />

      <div className="AboutMain__container">
        {/* ==============================
            BRAND STORY
        ============================== */}
        <div className="AboutMain__story">
          {/* Saree image */}
          <div className="AboutMain__visual">
            <div className="AboutMain__image-frame">
              <img
                className="AboutMain__image"
                src={sareeImage}
                alt="Traditional Indian handloom saree collection"
                loading="eager"
                fetchPriority="high"
              />

              <div
                className="AboutMain__image-overlay"
                aria-hidden="true"
              />

              <div className="AboutMain__image-badge">
                <span className="AboutMain__badge-label">
                  Our Heritage
                </span>

                <span className="AboutMain__badge-title">
                  Tradition
                  <br />
                  In Every
                  <br />
                  Weave
                </span>

                <span className="AboutMain__badge-ornament">
                  ✥
                </span>
              </div>

              <div className="AboutMain__image-caption">
                <span className="AboutMain__caption-line" />
                <span>THE ART OF HANDLOOM</span>
                <span className="AboutMain__caption-line" />
              </div>
            </div>

            <div
              className="AboutMain__image-decoration"
              aria-hidden="true"
            >
              ✺
            </div>

            <span
              className="AboutMain__vertical-ornament"
              aria-hidden="true"
            >
              ✥
            </span>
          </div>

          {/* Brand story content */}
          <div className="AboutMain__content">
            <div className="AboutMain__eyebrow">
              <span className="AboutMain__eyebrow-line" />
              <span>ABOUT OUR HERITAGE</span>
            </div>

            <h1
              className="AboutMain__heading"
              id="AboutMain-heading"
            >
              Every Thread Tells
              <br />
              <span>A Beautiful Story.</span>
            </h1>

            <div className="AboutMain__title-divider">
              <span />
              <span className="AboutMain__divider-icon">
                ✥
              </span>
              <span />
            </div>

            <p className="AboutMain__intro">
              Celebrating the timeless beauty of Indian handloom,
              where generations of craftsmanship meet the elegance
              of modern living.
            </p>

            <div className="AboutMain__body">
              <p>
                At <strong>ODC Handloom</strong>, every saree is
                more than a piece of fabric. It is a story of
                tradition, a celebration of culture, and a
                reflection of the extraordinary skills of our
                artisans.
              </p>

              <p>
                Inspired by Odisha's rich textile heritage, we
                celebrate the beauty of traditional
                <strong> Sambalpuri sarees</strong>. From intricate
                ikat patterns to beautiful colours and timeless
                motifs, every weave carries a legacy worth
                preserving.
              </p>

              <p>
                We believe in keeping handmade traditions alive
                while bringing authentic Indian craftsmanship to
                modern wardrobes. Every creation celebrates the
                artistry, patience, and dedication behind each
                thread.
              </p>
            </div>

            <div className="AboutMain__signature">
              <div className="AboutMain__signature-icon">
                <Flower2 size={25} strokeWidth={1.3} />
              </div>

              <div className="AboutMain__signature-text">
                <span>Crafted with tradition</span>
                <span>
                  Made with care. Woven to be treasured.
                </span>
              </div>
            </div>

            <a
              href="/collections"
              className="AboutMain__button"
            >
              <span>Explore Our Collection</span>

              <ArrowUpRight
                className="AboutMain__button-icon"
                size={19}
              />
            </a>
          </div>
        </div>

        {/* ==============================
            HERITAGE STATISTICS
        ============================== */}
        <div className="AboutMain__heritage">
          <div className="AboutMain__heritage-heading">
            <span className="AboutMain__heritage-kicker">
              OUR JOURNEY
            </span>

            <h2>
              Heritage
              <br />
              In Numbers
            </h2>

            <div className="AboutMain__heritage-divider">
              <span />
              <span>✥</span>
              <span />
            </div>
          </div>

          {heritageStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                className="AboutMain__stat"
                key={stat.label}
                style={{
                  "--AboutMain-stat-index": index,
                }}
              >
                <div className="AboutMain__stat-icon">
                  <Icon size={36} strokeWidth={1.35} />
                </div>

                <div className="AboutMain__stat-value">
                  {counts[index].toLocaleString("en-IN")}
                  {stat.suffix}
                </div>

                <p className="AboutMain__stat-label">
                  {stat.label}
                </p>
              </div>
            );
          })}

          <div className="AboutMain__stat AboutMain__stat--india">
            <div className="AboutMain__india-icon">
              <MapPinned size={39} strokeWidth={1.3} />
            </div>

            <div className="AboutMain__stat-value">
              Across India
            </div>

            <p className="AboutMain__stat-label">
              Celebrating Indian Heritage
            </p>
          </div>
        </div>
      </div>

      <div
        className="AboutMain__decoration AboutMain__decoration--bottom"
        aria-hidden="true"
      />
    </section>
  );
};

export default AboutMain;