// Import section
import React from "react";
import "../../App.css";
import Navbar from "../Navbar";
import AboutSection from "../AboutSection";
import Footer from "../Footer";

// Component for the About page
function About() {
  return (
    <>
      <Navbar />
      <AboutSection />
      <Footer />
    </>
  );
}

export default About; // Exporting the About component to be used in App.js
