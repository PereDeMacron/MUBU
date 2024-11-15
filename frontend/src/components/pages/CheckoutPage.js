// Import section
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar";

// Component for the Checkout page
const CheckoutPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Set the checkout success message on component mount
  useEffect(() => {
    setMessage(
      "All items were successfully checked out and removed from the cart."
    );
  }, []);

  // Navigate back to the cart page
  const handleGoBack = () => {
    navigate("/cart");
  };

  return (
    <>
      <NavBar /> {/* Top navigation bar */}
      <div className="checkout-container">
        <h1>Checkout Successful</h1>
        <p>{message}</p> {/* Display success message */}
        <button onClick={handleGoBack} className="go-back-button">
          Go Back to Cart
        </button>{" "}
        {/* Button to return to the cart */}
      </div>
    </>
  );
};

export default CheckoutPage; // Exporting the CheckoutPage component to be used in App.js
