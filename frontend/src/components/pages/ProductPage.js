// Import section
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./ProductPage.css";

function ProductPage() {
  // Fetch product ID from URL params
  const { productId } = useParams();
  const navigate = useNavigate();

  // State management for product details, size selection, loading, and user ID
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Check if the user is logged in on page load
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      console.log("User not logged in. Redirecting to login page.");
      navigate("/signup");
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  // Fetch product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/items/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct({
          ...data,
          sizes: [
            { size: "41", available: true },
            { size: "42", available: false },
            { size: "43", available: true },
            { size: "44", available: true },
          ],
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Retrieve user details from localStorage
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("UserDetails"));
    if (userDetails && userDetails.userId) {
      setUserId(userDetails.userId);
    } else {
      console.error("User ID is missing in localStorage");
    }
  }, []);

  // If the product is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no product is found
  if (!product) {
    return <div>Product not found</div>;
  }

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Add selected product to the cart
  const handleAddToCart = () => {
    if (userId) {
      console.log(`User ID: ${userId}`);
      fetch("http://localhost:8081/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id,
          size: selectedSize,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Item added to cart", data))
        .catch((error) => console.error("Error adding item to cart:", error));
    } else {
      console.error("User ID is missing. Cannot add item to cart.");
    }
  };

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-content">
        {/* Product image and delivery info */}
        <div className="item-image">
          <img alt={product.alt} src={product.src} />
          <span className="delivery-time">48H</span>{" "}
          {/* Delivery time display */}
        </div>

        {/* Product information */}
        <div className="product-info">
          <h1 className="item-name">{product.text}</h1>
          <p className="price">{product.label}</p>

          {/* Size selection */}
          <div className="size-selection">
            <h3>Select your size</h3>
            <div className="size-grid">
              {product.sizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  className={`size-button ${
                    sizeObj.available ? "" : "unavailable"
                  } ${selectedSize === sizeObj.size ? "selected" : ""}`}
                  onClick={() =>
                    sizeObj.available && handleSizeSelect(sizeObj.size)
                  }
                  disabled={!sizeObj.available}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <button
            className="add-to-cart-btn"
            disabled={!selectedSize} // Disable button if no size is selected
            onClick={handleAddToCart}
          >
            {selectedSize
              ? `Add to cart - Size ${selectedSize}`
              : "Select a size"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage; // Exporting the ProductPage component to be used in App.js
