import React from "react";

const Header = () => (
  <header className="nav-bounds">
    <div className="nav-header">
      {/* Logo */}
      <a href="/" className="nav-logo" aria-label="Mercado Libre Home">
        <img
          src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.5.1/mercadolibre/logo__large_plus.png"
          alt="Mercado Libre"
          className="nav-logo-img"
        />
      </a>
      {/* Buscador */}
      <form className="nav-search" role="search">
        <input
          type="text"
          className="nav-search-input"
          placeholder="Buscar productos, marcas y más…"
          maxLength={120}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
        />
        <button type="submit" className="nav-search-btn" aria-label="Buscar">
          <span className="nav-icon-search" />
        </button>
      </form>
      {/* Zona usuario/carrito/notificaciones */}
      <div className="nav-right-area">
        <a href="#" className="nav-icon-btn" title="Notificaciones">
          <span className="nav-icon-notifications" />
        </a>
        <a href="#" className="nav-icon-btn" title="Mi cuenta">
          <span className="nav-icon-user" />
        </a>
        <a href="#" className="nav-icon-btn" title="Carrito">
          <span className="nav-icon-cart" />
        </a>
      </div>
    </div>
  </header>
);

export default Header; 