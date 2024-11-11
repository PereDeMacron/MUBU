import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Main from "./components/pages/Main";
import Products from "./components/pages/Products";
import ProductPage from "./components/pages/ProductPage";
import About from "./components/pages/About";
import SignUpLogin from "./components/pages/SignUpLogin";
import Account from "./components/pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageProducts from "./components/pages/ManageProducts";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/signup" element={<SignUpLogin />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/register" element={<SignUpLogin />} />
        <Route path="/manage" element={<ManageProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
