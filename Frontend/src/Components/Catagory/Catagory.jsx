
import React from "react";
import "./Catagory.css";

import categoryImage1 from "../../assets/1.jpeg";
import categoryImage2 from "../../assets/2.jpeg";
import categoryImage3 from "../../assets/3.jpeg";
import categoryImage4 from "../../assets/4.jpeg";
import categoryImage5 from "../../assets/5.jpeg";
import categoryImage6 from "../../assets/6.jpeg";

const categories = [
  {
    id: 1,
    title: "handwoven silk sarees",
    image: categoryImage1,
  },
  {
    id: 2,
    title: "handloom fabrics",
    image: categoryImage2,
  },
  {
    id: 3,
    title: "handwoven dupatta",
    image: categoryImage3,
  },
  {
    id: 4,
    title: "handcrafted apparels",
    image: categoryImage4,
  },
  {
    id: 5,
    title: "traditional sarees",
    image: categoryImage5,
  },
  {
    id: 6,
    title: "designer silk sarees",
    image: categoryImage6,
  },
  {
    id: 7,
    title: "handloom craftsmanship",
    image: categoryImage2,
  },
  {
    id: 8,
    title: "ethnic fashion",
    image: categoryImage4,
  },
];

const Catagory = () => {
  return (
    <section className="Catagory" aria-labelledby="Catagory-heading">
      <div className="Catagory-container">
        <h2 className="Catagory-heading" id="Catagory-heading">
          shop by category
        </h2>

        <div className="Catagory-grid">
          {categories.map((category) => (
            <a
              className="Catagory-card"
              href={`#category-${category.id}`}
              key={category.id}
              aria-label={`Explore ${category.title}`}
            >
              <img
                className="Catagory-image"
                src={category.image}
                alt={category.title}
                loading={category.id <= 4 ? "eager" : "lazy"}
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />

              <span className="Catagory-label">
                {category.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catagory;
