import React, { useState, useEffect } from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  return (
    <div className="cards">
      <h1>Products</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {products.map((product) => (
            <CardItem
              productId={product.productId}
              text={product.text}
              src={product.src}
              label={product.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
