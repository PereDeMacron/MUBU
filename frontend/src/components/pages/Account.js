// Import section
import React from "react";
import "../../App.css";
import Navbar from "../Navbar";
import SettingsPage from "../SettingsPage";
import Footer from "../Footer";

// Component for the Account page
function Account() {
  return (
    <>
      <Navbar />
      <SettingsPage />
      <Footer />
    </>
  );
}

export default Account; // Exporting the Account component to be used in App.js
