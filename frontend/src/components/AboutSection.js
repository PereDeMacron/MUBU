import React, { useState, useEffect } from "react";
import "./AboutSection.css";

const LandingSection = () => {
  // Defining an array of images for the image carousel
  const images = [
    "/images/img-1.jpg",
    "/images/img-2.jpg",
    "/images/nike-shox-lp.png",
  ];

  // Using useState hook to manage the current image index for the carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Using useEffect to set up the automatic image carousel
  useEffect(() => {
    const timer = setInterval(() => {
      // Updating the image index to cycle through the images
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Changing image every 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  // Function to handle the image change when a dot control is clicked
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-text">
          <div>
            {/* Main title and description */}
            <h1 className="landing-title">
              Mubu's unique
              <br />
              Shopping style
              <br />
            </h1>
            <p className="landing-description">
              We set out to celebrate the launch of Mubu's collection in unique
              styles. From the streets to the runway, our products are uniquely
              inspired by the urban culture all around France.
            </p>
          </div>

          {/* Category section with buttons */}
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

          {/* Buttons to view products and about page */}
          <button className="view-product-button">View Products</button>
          <button className="view-product-button">About</button>
        </div>

        <div className="product-showcase">
          <div className="slider-container">
            {/* Rendering images in the carousel */}
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

          {/* Interactive controls for navigating the carousel */}
          <div className="interactive-controls">
            <button className="plus-button">+</button>
            <div className="dot-controls">
              {/* Dot controls for manual image selection */}
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? "active" : ""
                  }`} // Add 'active' class to the current dot
                  onClick={() => goToSlide(index)} // Navigate to the clicked slide
                />
              ))}
            </div>
          </div>

          {/* Product card section */}
          <div className="product-card">
            <h4 className="product-card-title">Inspired by the best</h4>
          </div>
        </div>

        {/* Stats section */}
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

        {/* Social media links */}
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

export default LandingSection; // Export the LandingSection component to be use in a page
