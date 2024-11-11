import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch userId from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch cart items when the component mounts
  useEffect(() => {
    console.log("Current User ID:", userId);

    const fetchCartItems = async () => {
      if (!userId) {
        console.log("No user ID found, skipping fetch");
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/cart/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Cart items fetched:", data);
          setCartItems(data); // Populate cart items state
        } else {
          setError("Error fetching cart items");
        }
      } catch (error) {
        setError("Error fetching cart items");
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchCartItems();
  }, [userId]); // Dependency array to trigger useEffect when userId changes

  // Function to remove item from cart and update state
  const removeFromCart = async (productId) => {
    if (!userId) {
      alert("You must be logged in to remove items from the cart.");
      return;
    }

    try {
      // Send DELETE request to backend to remove item
      const response = await fetch(
        `http://localhost:8081/cart/${userId}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Item removed from cart");
        // Update state to remove the item from the UI
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== productId)
        );
      } else {
        alert("Error removing item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Render cart items
  return (
    <div>
      <h1>Your Cart</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.product_id}>
            <h2>{item.text}</h2>
            <img src={item.src} alt={item.alt} />
            <p>{item.text}</p>
            <p>Size: {item.selected_size}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.product_id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
