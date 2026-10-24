
import React, { useEffect, useState } from "react";
import "./HeroSection.css";

import banner1 from "../../assets/1.jpeg";
import banner2 from "../../assets/2.jpeg";
import banner3 from "../../assets/3.jpeg";
import banner4 from "../../assets/4.jpeg";
import banner5 from "../../assets/5.jpeg";
import banner6 from "../../assets/6.jpeg";

const banners = [
  { id: 1, image: banner1, alt: "Saree fashion at sunset near a bridge" },
  { id: 2, image: banner2, alt: "Colorful traditional silk sarees" },
  { id: 3, image: banner3, alt: "Elegant golden saree in heritage architecture" },
  { id: 4, image: banner4, alt: "Pink saree beside a palace lake" },
  { id: 5, image: banner5, alt: "Traditional ivory and pink silk saree" },
  { id: 6, image: banner6, alt: "Handloom weaving craftsmanship" },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="HeroSection" aria-label="Fashion image slider">
      <div
        className="HeroSection-track"
        style={{
          transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
        }}
      >
        {banners.map((banner, index) => (
          <div className="HeroSection-slide" key={banner.id}>
            <img
              className="HeroSection-image"
              src={banner.image}
              alt={banner.alt}
              loading={index === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
