import React, { useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import products from "./products.json";

function Cards() {
  const [productsData] = useState(products);

  return (
    <div className="cards">
      <h1>Products</h1>
      <div className="cards__container">
        <ul className="cards__items">
          {productsData.map(
            (
              product
            ) => (
              <CardItem
                key={product.productId}
                productId={product.productId}
                text={product.text}
                src={product.src}
                label={product.label}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Cards;
