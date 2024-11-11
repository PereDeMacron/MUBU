import React, { useState, useEffect } from "react";
import "../../App.css";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";

function Products() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8081/items");
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <NavBar />
      <div className="cards">
        <h1>Products</h1>
        <div className="cards__container">
          <ul className="cards__items">
            {productsData.map((product) => (
              <li key={product.id} className="cards__item">
                <Link
                  className="cards__item__link"
                  to={`/product/${product.id}`}
                >
                  <figure
                    className="cards__item__pic-wrap"
                    data-category={product.label}
                  >
                    <img
                      className="cards__item__img"
                      alt={product.alt}
                      src={product.src}
                    />
                  </figure>
                  <div className="cards__item__info">
                    <h5 className="cards__item__text">{product.text}</h5>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
