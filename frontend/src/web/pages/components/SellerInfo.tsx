import React from "react";

interface Seller {
  id: number;
  name: string;
  reputation: {
    level: string;
    transactions_completed: number;
    rating: number;
  };
  is_official_store: boolean;
  image: string;
}

interface SellerInfoProps {
  seller: Seller;
}

const SellerInfo = ({ seller }: SellerInfoProps) => (
  <div className="seller-box">
    <div className="seller-header">
      <img src={seller.image} alt={seller.name} className="seller-logo" />
      <div className="seller-title">
        <div className="seller-name">{seller.name}</div>
        <div className="seller-meta">
          <span className="seller-followers">+{seller.reputation.transactions_completed.toLocaleString()} Ventas</span>
          <span className="seller-rating">⭐ {seller.reputation.rating}/5</span>
        </div>
      </div>
      <button className="seller-follow">Seguir</button>
    </div>
    <div className="seller-platinum">
      <span className="seller-platinum-badge">
        {seller.is_official_store ? "Tienda Oficial" : "Vendedor"}
      </span>
      <span className="seller-platinum-text">
        {seller.reputation.level === "platinum" ? "MercadoLíder Platinum" : "Vendedor"}
      </span>
    </div>
    <div className="seller-reputation-bar">
      <div 
        className="seller-reputation-fill" 
        style={{ width: (seller.reputation.rating / 5) * 100 + "%" }} 
      />
    </div>
    <div className="seller-stats">
      <div className="seller-stat">
        <span className="seller-stat-value">{seller.reputation.transactions_completed.toLocaleString()}</span>
        <span className="seller-stat-label">Ventas concretadas</span>
      </div>
      <div className="seller-stat">
        <span className="seller-stat-value">⭐</span>
        <span className="seller-stat-label">{seller.reputation.rating}/5 Calificación</span>
      </div>
      <div className="seller-stat">
        <span className="seller-stat-value">🏆</span>
        <span className="seller-stat-label">{seller.reputation.level}</span>
      </div>
    </div>
    <a href={`https://www.mercadolibre.com.ar/perfil/${seller.name.replace(/\s+/g, '+')}`} className="seller-link">
      Ir a la página del vendedor
    </a>
  </div>
);

export default SellerInfo; 