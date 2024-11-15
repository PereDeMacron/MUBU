import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    // Check if the user is logged in based on localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Check button visibility on initial load
    showButton();

    // Cleanup resize event listener when the component unmounts
    window.addEventListener("resize", showButton);
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            MUBU
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <Link
                  to="/account"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Account
                </Link>
              ) : (
                <Link
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                  to="/register"
                >
                  Sign Up
                </Link>
              )}
            </li>
          </ul>

          <Link to="/cart" className="nav-links">
            <i className="fas fa-shopping-cart"></i>
          </Link>

          {button && (
            <Button
              buttonStyle="btn--outline"
              destination={isLoggedIn ? "/account" : "/register"}
            >
              {isLoggedIn ? "Account" : "SIGN UP"}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
