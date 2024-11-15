// Import section
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import "./Cart.css";

// Cart component
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem("userId");

  // Helper function to extract numeric price from a string
  const getNumericPrice = (price) => {
    return parseFloat(price.replace(/[^0-9.-]+/g, ""));
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/cart/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
          // Calculate total price
          const total = data.reduce(
            (sum, item) => sum + getNumericPrice(item.label) * item.quantity,
            0
          );
          setTotalPrice(total);
        } else {
          setError("Error fetching cart items");
        }
      } catch (error) {
        setError("Error fetching cart items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!userId) {
      console.log("You must be logged in to remove items from the cart.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/cart/${userId}/${productId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        // Remove item locally after successful deletion
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter(
            (item) => item.product_id !== productId
          );
          // Update total price
          const total = updatedItems.reduce(
            (sum, item) => sum + getNumericPrice(item.label) * item.quantity,
            0
          );
          setTotalPrice(total);
          return updatedItems;
        });
      } else {
        console.log("Error removing item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Handle checkout by clearing cart and redirect
  const handleCheckout = async () => {
    if (!userId) {
      alert("You must be logged in to proceed with checkout.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/cart/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCartItems([]);
        setTotalPrice(0);
        navigate("/checkout");
      } else {
        alert("Error clearing cart items");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <>
      <NavBar /> {/* Top navbar */}
      <div className="cart-container">
        <h1>Your Cart</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {/* Display cart items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.product_id} className="cart-item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h2>{item.text}</h2>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {getNumericPrice(item.label).toFixed(2)}€</p>
                  </div>
                  {/* Remove item button */}
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/* Cart summary section */}
            <div className="cart-summary">
              <h2>Total Price: {totalPrice.toFixed(2)}€</h2>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart; // Exporting the Cart component to be used in App.js
