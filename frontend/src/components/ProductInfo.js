import React from "react";
import "./ProductInfo.css";

function ProductInfo({ product }) {
  return (
    <div className="product-info">
      <h1>{product.name}</h1>
      <p className="price">{product.price}</p>
      <button className="select-size-btn">Sélectionner votre taille</button>
      <div className="payment-options">
        <p>Alma</p>
        <span>2x</span>
        <span>3x</span>
        <span>4x</span>
        <p>43,29 € puis 2 x 41,66 €</p>
      </div>
      <div className="product-features">
        <div className="feature">
          <img src="/path/to/icon1.png" alt="Feature 1" />
          <span>Wethenew Prep</span>
        </div>
        <div className="feature">
          <img src="/path/to/icon2.png" alt="Feature 2" />
          <span>Conseil Sizing</span>
        </div>
        <div className="feature">
          <img src="/path/to/icon3.png" alt="Feature 3" />
          <span>Authenticité</span>
        </div>
        <div className="feature">
          <img src="/path/to/icon4.png" alt="Feature 4" />
          <span>Retours</span>
        </div>
        <div className="feature">
          <img src="/path/to/icon5.png" alt="Feature 5" />
          <span>Article K.O</span>
        </div>
      </div>
      <div className="loyalty-points">
        <span>+ 125 points de fidélité</span>
        <a href="#">En savoir plus</a>
      </div>
      <div className="product-description">
        <h3>DESCRIPTION</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-authenticity">
        <h3>AUTHENTICITÉ</h3>
        {}
      </div>
    </div>
  );
}

export default ProductInfo;
