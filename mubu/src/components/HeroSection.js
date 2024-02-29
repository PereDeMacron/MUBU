import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>MUBU33</h1>
      <div className="hero-btns">
        <Button
          destination="/register"
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          S'ENREGISTRER
        </Button>
        <Button
        destination="/products"
          className="btns"
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
