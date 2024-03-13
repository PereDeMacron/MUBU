import React from "react";
import "./AddToCart.css";

function AddToCartButton({ product }) {
  const addToCart = () => {
    console.log("Product added to cart:", product);
  };

  return (
    <button className="add-to-cart-btn" onClick={addToCart}>
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
