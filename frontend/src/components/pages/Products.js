// Import section
import React, { useState, useEffect } from "react";
import "../../App.css";
import NavBar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";

// Products component to display the list of products
function Products() {
  const [productsData, setProductsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("normal");

  // Effect hook to fetch product data from the API when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetching the items data from the API endpoint
        const response = await axios.get("http://localhost:8081/items");
        // Adding price data to each product by parsing the label value to float
        const productsWithPrice = response.data.map((product) => ({
          ...product,
          price: parseFloat(product.label),
        }));
        // Setting the fetched data to the state
        setProductsData(productsWithPrice);
      } catch (error) {
        // Logging any errors if the request fails
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Function to handle the sorting of products based on price
  const handleSort = () => {
    let sortedData;
    // Check the current sort order and sort accordingly
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
      <NavBar /> {/* Rendering the NavBar component */}
      <div className="cards">
        <h1>Products</h1>
        <div className="sort-container">
          {/* Button to trigger sorting by price */}
          <button className="sort-button" onClick={handleSort}>
            Sort by Price (
            {sortOrder === "normal"
              ? "default"
              : sortOrder === "lowToHigh"
              ? "Low to High"
              : "High to Low"}{" "}
            )
          </button>
        </div>
        <div className="cards__container">
          {/* Rendering each product as a card */}
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
                    {/* Displaying the product image */}
                    <img
                      className="cards__item__img"
                      alt={product.alt}
                      src={product.src}
                    />
                  </figure>
                  <div className="cards__item__info">
                    {/* Product title and price */}
                    <h5 className="cards__item__text">{product.text}</h5>
                    <p className="cards__item__price">
                      ${product.price.toFixed(2)}{" "}
                      {/* Formatting the price to two decimal places */}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer /> {/* Rendering the Footer component */}
    </>
  );
}

export default Products; // Exporting the Products component to be used in App.js
