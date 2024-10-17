import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import products from "../products.json";
import "./ProductPage.css";

function ProductPage() {
  const { productId } = useParams();
  const product = products.find(
    (item) => item.productId === parseInt(productId)
  );
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      console.log(`Added to cart: ${product.text} - Size: ${selectedSize}`);
    }
  };

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-content">
        <div className="product-image">
          <img
            src={process.env.PUBLIC_URL + "/" + product.src}
            alt={product.alt}
          />
          <span className="delivery-time">48H</span>
        </div>
        <div className="product-info">
          <h1>{product.text}</h1>
          <p className="price">{product.label}</p>
          <div className="size-selection">
            <h3>Sélectionner votre taille</h3>
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
              ? `Ajouter au panier - Taille ${selectedSize}`
              : "Sélectionner une taille"}
          </button>
          <div className="payment-options">
            <p>Alma</p>
            <p>2x3x4x</p>
            <p>43,29 € puis 2 x 41,66 €</p>
          </div>
          <div className="product-features">
            <div className="feature">1</div>
            <div className="feature">2</div>
            <div className="feature">3</div>
            <div className="feature">4</div>
            <div className="feature">5</div>
          </div>
          <div className="loyalty-points">
            <span>+ 125 points de fidélité</span>
            <a href="#">En savoir plus</a>
          </div>
          <div className="product-description">
            <h3>DESCRIPTION</h3>
            <p>
              Imaginé en 1985, ce classique de la garde robe s'affirme comme la
              silhouette tendance par excellence !
            </p>
          </div>
          <div className="product-authenticity">
            <h3>AUTHENTICITÉ</h3>
            {
              "Achetez sur Mubu en toute confiance en sachant que chaque achat est vérifié par Mubu. Vérifié par Mubu est notre propre désignation et n'est pas endossé par les marques vendues sur Mubu."
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
