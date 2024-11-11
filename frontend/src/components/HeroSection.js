import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("Is user logged in:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/products");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>MUBU33</h1>
      <div className="hero-btns">
        <Button
          destination="/about"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          À PROPOS
        </Button>
        <Button
          onClick={handleRegisterClick}
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          S'ENREGISTRER
        </Button>
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
