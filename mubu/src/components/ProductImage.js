import React from "react";
import "./ProductImage.css";

function ProductImage({ image }) {
  return (
    <div className="product-image">
      <img src={image} alt="Product" />
      <span className="delivery-time">LIVRAISON 48H</span>
    </div>
  );
}

export default ProductImage;
