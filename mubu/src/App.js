import React from 'react';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import Main from "./components/pages/Main";
import Products from "./components/pages/Products";
import Register from "./components/pages/Register";
import ProductPage from './components/pages/ProductPage';
import About from './components/pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<Main />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
