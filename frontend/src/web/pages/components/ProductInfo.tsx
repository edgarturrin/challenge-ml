import React from "react";

const ProductInfo = ({
  title, price, discount, installments, stock, color, memory, features, onAddToCart
}) => (
  <div className="ml-info">
    <div className="ml-info__sold">Nuevo | +500 vendidos</div>
    <h1 className="ml-info__title">{title || 'Sin título'}</h1>
    <div className="ml-info__price-row">
      <span className="ml-info__price">$ {price ? price.toLocaleString() : '0'}</span>
      {discount > 0 && <span className="ml-info__discount">{discount}% OFF</span>}
    </div>
    {installments && <div className="ml-info__installments">{installments}</div>}
    <div className={`ml-info__stock${stock > 0 ? '' : ' ml-info__stock--out'}`}>{stock > 0 ? `Stock disponible (${stock})` : "Sin stock"}</div>
    <div className="ml-info__actions">
      <button className="ml-info__buy">Comprar ahora</button>
      <button className="ml-info__cart" onClick={onAddToCart}>Agregar al carrito</button>
    </div>
    <div className="ml-info__props">
      <div><strong>Color:</strong> {color || 'No especificado'}</div>
      <div><strong>Memoria:</strong> {memory || 'No especificado'}</div>
    </div>
    {features && Array.isArray(features) && features.length > 0 && (
      <div className="ml-info__features">
        <h3 className="ml-info__features-title">Características principales</h3>
        <ul className="ml-info__features-list">
          {features.map((f, i) => (
            <li key={i}><strong>{f.label}:</strong> {f.value}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ProductInfo; 