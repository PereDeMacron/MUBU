import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle the "S'ENREGISTRER" button click
  const handleRegisterClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Checking if the user is logged in based on localStorage
    console.log("Is user logged in:", isLoggedIn);

    // Navigating based on the login status
    if (isLoggedIn) {
      navigate("/products"); // If logged in, navigate to the /products page
    } else {
      navigate("/register"); // If not logged in, navigate to the /register page
    }
  };

  return (
    <div className="hero-container">
      {" "}
      {/* Container for the hero section */}
      <video src="/videos/video-1.mp4" autoPlay loop muted />{" "}
      {/* Background video */}
      <h1>MUBU33</h1> {/* Main heading of the hero section */}
      <div className="hero-btns">
        {" "}
        {/* Container for the buttons */}
        {/* Button to navigate to the About page */}
        <Button
          destination="/about"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          À PROPOS
        </Button>
        {/* Button to handle registration or product page redirection */}
        <Button
          onClick={handleRegisterClick}
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          S'ENREGISTRER
        </Button>
        {/* Button to navigate to the Products page */}
        <Button
          destination="/products"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          ENTRER AVEC UN MOT DE PASSE
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
