import React, { useState, useEffect } from "react";
import "./AboutSection.css";

const LandingSection = () => {
  const images = [
    "/images/img-1.jpg",
    "/images/img-2.jpg",
    "/images/nike-shox-lp.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-text">
          <div>
            <h1 className="landing-title">
              Mubu's unique
              <br />
              Shopping style
              <br />
            </h1>
            <p className="landing-description">
              We set out to celebrate the launch of Mubu's collection in unique
              styles . From the streets to the runway, our products are uniquely
              inspired by the urban culture all around France.
            </p>
          </div>

          <div className="category-section">
            <h3 className="category-title">Choose a Product Category</h3>
            <div className="category-buttons">
              {[
                "Street Collection",
                "Urban Collection",
                "Classic Collection",
              ].map((category) => (
                <button key={category} className="category-button">
                  {category}
                </button>
              ))}
            </div>
          </div>

          <button className="view-product-button">View Products</button>
          <button className="view-product-button">About</button>
        </div>

        <div className="product-showcase">
          <div className="slider-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Sneaker ${index + 1}`}
                className={`product-image ${
                  index === currentImageIndex ? "active" : ""
                }`}
              />
            ))}
          </div>

          <div className="interactive-controls">
            <button className="plus-button">+</button>
            <div className="dot-controls">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-card">
            <h4 className="product-card-title">Inspired by the best</h4>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h2>100+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h2>50+</h2>
            <p>Team Members</p>
          </div>
          <div className="stat-item">
            <h2>40</h2>
            <p>Client Reviews</p>
          </div>
        </div>

        <div className="social-links">
          <span>Follow Us</span>
          {["Instagram", "Twitter", "LinkedIn"].map((social) => (
            <button key={social} className="social-button">
              {social}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
