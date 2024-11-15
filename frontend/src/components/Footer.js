import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      {" "}
      {/* Main container for the footer */}
      {/* Newsletter Subscription Section */}
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          {/* Form for email input */}
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            {/* Subscribe button */}
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      {/* Footer Links Section */}
      <div className="footer-links">
        <div className="footer-link-wrapper">
          {/* Individual Footer Links */}
          <div className="footer-link-items">
            <a href="/about">
              <h2>À PROPOS</h2> {/* Link to About page */}
            </a>
          </div>
          <div className="footer-link-items">
            <a href="/contact">
              <h2>CONTACT</h2> {/* Link to Contact page */}
            </a>
          </div>
          <div className="footer-link-items">
            <a href="/pannel">
              <h2>PANNEL</h2> {/* Link to Panel page */}
            </a>
          </div>
        </div>
      </div>
      {/* Social Media Section */}
      <section className="social-media">
        <div className="social-media-wrap">
          {/* Footer Logo */}
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              MUBU
            </Link>
          </div>

          {/* Copyright Information */}
          <small className="website-rights">MUBU © 2024</small>

          {/* Social Media Icons */}
          <div className="social-icons">
            {/* LinkedIn */}
            <Link
              className="social-icon-link linkedin"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer; // Export the Footer component to be use in a page
