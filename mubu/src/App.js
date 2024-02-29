import React from 'react';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import Main from "./components/pages/Main";
import Products from "./components/pages/Products";
import Register from "./components/pages/Register";
import ItemSection from './components/ItemSection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Products />} />
        <Route path="/item" element={<ItemSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
