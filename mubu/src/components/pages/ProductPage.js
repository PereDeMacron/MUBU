import React from "react";
import ProductDetails from "../ProductDetails";
import AddToCartButton from "../AddToCartButton";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import products from "../products.json";

function ProductPage() {
  const { productId } = useParams();
  const product = products.find(
    (item) => item.productId === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <Navbar />
      <ProductDetails product={product} />
      <AddToCartButton product={product} />
    </div>
  );
}

export default ProductPage;
