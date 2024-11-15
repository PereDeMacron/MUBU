import React, { useState } from "react";
import "./Mail.css";
import { Button } from "./Button";
import axios from "axios";

function Mail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email to the server for subscription
      const response = await axios.post("/subscribe", { email });

      if (response.status === 201) {
        setMessage("Subscription successful!");
        setEmail("");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Error subscribing. Please try again later.");
    }

    // Clear the message after 5 seconds to give feedback to the user
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">ENTER EMAIL</p>
        <div className="input-areas">
          <form onSubmit={handleFormSubmit}>
            {" "}
            {/* On form submit, call handleFormSubmit */}
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange} // Update email state
              required // Ensure email input is required
            />
            <Button type="submit" buttonStyle="btn--outline">
              Submit
            </Button>
          </form>
          {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
      </section>
    </div>
  );
}

export default Mail;
