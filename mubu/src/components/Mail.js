import React from "react";
import "./Mail.css";
import { Button } from "./Button";

function Mail() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">ENTER EMAIL</p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Submit</Button>
          </form>
        </div>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
      </section>
    </div>
  );
}

export default Mail;
