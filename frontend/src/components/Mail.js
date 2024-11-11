import React, { useState } from "react";
import "./Mail.css";
import { Button } from "./Button";
import axios from "axios";

function Mail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/subscribe", { email });
      if (response.status === 201) {
        setMessage("Subscription successful!");
        setEmail("");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Error subscribing. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">ENTER EMAIL</p>
        <div className="input-areas">
          <form onSubmit={handleFormSubmit}>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
            />
            <Button type="submit" buttonStyle="btn--outline" onClick={console.log("1")}>
              Submit
            </Button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
      </section>
    </div>
  );
}

export default Mail;
