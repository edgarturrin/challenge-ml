import React from "react";

const ProductCard = ({ id, title, price, image }) => (
  <div className="home-card">
    <img src={image} alt={title} className="home-card-img" />
    <div className="home-card-title">{title}</div>
    <div className="home-card-price">$ {price.toLocaleString()}</div>
    <a href={`/${id}`} className="home-card-btn">Ver detalle</a>
  </div>
);

export default ProductCard; 