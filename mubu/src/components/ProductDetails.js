import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import products from "./products.json";

function ProductDetails() {
  const { productId } = useParams();
  const product = products.find(
    (item) => item.productId === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <img
        src={process.env.PUBLIC_URL + "/" + product.src}
        class="item__img"
        alt={product.alt}
      />
      <h2 className="article">{product.text}</h2>
      <p className="price">{product.label}</p>
    </div>
  );
}

export default ProductDetails;
