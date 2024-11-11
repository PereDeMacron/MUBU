import React, { useState, useEffect } from "react";
import "../../App.css";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";

function Products() {
  const [productsData, setProductsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("normal");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8081/items");
        const productsWithPrice = response.data.map((product) => ({
          ...product,
          price: parseFloat(product.label),
        }));
        setProductsData(productsWithPrice);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSort = () => {
    let sortedData;
    if (sortOrder === "normal") {
      sortedData = [...productsData].sort((a, b) => a.price - b.price);
      setSortOrder("lowToHigh");
    } else if (sortOrder === "lowToHigh") {
      sortedData = [...productsData].sort((a, b) => b.price - a.price);
      setSortOrder("highToLow");
    } else if (sortOrder === "highToLow") {
      sortedData = [...productsData].sort((a, b) => a.id - b.id);
      setSortOrder("normal");
    }
    setProductsData(sortedData);
  };

  return (
    <>
      <NavBar />
      <div className="cards">
        <h1>Products</h1>
        <div class="sort-container">
          <button className="sort-button" onClick={handleSort}>
            Sort by Price (
            {sortOrder === "normal"
              ? "default"
              : sortOrder === "lowToHigh"
              ? "Low to High"
              : "High to Low"}
            )
          </button>
        </div>
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
                    <p className="cards__item__price">
                      ${product.price.toFixed(2)}
                    </p>{" "}
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
