
import React from "react";
import "./ShopByCraft.css";

import craftImage1 from "../../assets/1.jpeg";
import craftImage2 from "../../assets/2.jpeg";
import craftImage3 from "../../assets/3.jpeg";
import craftImage4 from "../../assets/4.jpeg";

const crafts = [
  {
    id: 1,
    title: "bengal",
    image: craftImage1,
    alt: "Traditional Bengal handloom saree",
  },
  {
    id: 2,
    title: "pochampally ikat",
    image: craftImage2,
    alt: "Colorful traditional handwoven textile",
  },
  {
    id: 3,
    title: "sambalpuri",
    image: craftImage3,
    alt: "Traditional Sambalpuri handloom saree",
  },
  {
    id: 4,
    title: "narayanapet",
    image: craftImage4,
    alt: "Elegant traditional Indian saree",
  },
];

const ShopByCraft = () => {
  return (
    <section className="ShopByCraft" aria-labelledby="ShopByCraft-heading">
      <div className="ShopByCraft-container">
        <h2 className="ShopByCraft-heading" id="ShopByCraft-heading">
          shop by craft
        </h2>

        <div className="ShopByCraft-grid">
          {crafts.map((craft) => (
            <a
              className="ShopByCraft-card"
              href={`#${craft.title.replace(/\s+/g, "-")}`}
              key={craft.id}
              aria-label={`Explore ${craft.title} crafts`}
            >
              <img
                className="ShopByCraft-image"
                src={craft.image}
                alt={craft.alt}
                loading={craft.id === 1 ? "eager" : "lazy"}
              />

              <span className="ShopByCraft-label">{craft.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Floating reviews panel */}
      

      
      {/* Floating gift button */}
      <button
        className="ShopByCraft-gift"
        type="button"
        aria-label="Discover gifts"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          className="ShopByCraft-giftIcon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 10h18v4H3zM5 14h14v8H5zM12 10v12M3 7h18v3H3z"
            fill="currentColor"
          />
          <path
            d="M12 7H7.5a2.25 2.25 0 1 1 2.1-3.05C10.4 5.7 12 7 12 7Zm0 0h4.5a2.25 2.25 0 1 0-2.1-3.05C13.6 5.7 12 7 12 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Floating chat button */}
      <button
        className="ShopByCraft-chat"
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          className="ShopByCraft-chatIcon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 11.5a7.5 7.5 0 0 1-11.3 6.48L4 19l1.1-4.2A7.5 7.5 0 1 1 20 11.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};

export default ShopByCraft;
