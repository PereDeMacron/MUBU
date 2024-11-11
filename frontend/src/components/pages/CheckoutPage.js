import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar";

const CheckoutPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage(
      "All items were successfully checked out and removed from the cart."
    );
  }, []);

  const handleGoBack = () => {
    navigate("/cart");
  };

  return (
    <>
      <NavBar />
      <div className="checkout-container">
        <h1>Checkout Successful</h1>
        <p>{message}</p>
        <button onClick={handleGoBack} className="go-back-button">
          Go Back to Cart
        </button>
      </div>
    </>
  );
};

export default CheckoutPage;
