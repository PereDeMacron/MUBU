import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./ProductPage.css";

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      console.log("User not logged in. Redirecting to login page.");
      navigate("/signup");
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://mubu.herokuapp.comitems/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct({
          ...data,
          sizes: [
            { size: "S", available: true },
            { size: "M", available: false },
            { size: "L", available: true },
            { size: "XL", available: true },
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

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("UserDetails"));
    if (userDetails && userDetails.userId) {
      setUserId(userDetails.userId);
    } else {
      console.error("User ID is missing in localStorage");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (userId) {
      console.log(`User ID: ${userId}`);
      fetch("https://mubu.herokuapp.com/cart", {
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
        <div className="item-image">
          <img alt={product.alt} src={product.src} />
          <span className="delivery-time">48H</span>
        </div>
        <div className="product-info">
          <h1 className="item-name">{product.text}</h1>
          <p className="price">{product.label}</p>
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
          <button
            className="add-to-cart-btn"
            disabled={!selectedSize}
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

export default ProductPage;
