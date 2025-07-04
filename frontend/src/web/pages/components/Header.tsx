import React, { useState } from "react";
import apiService from "../../services/api";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onSearch?: (value: string) => void;
  children?: (props: { handleAddToCart: (product: any) => void; cart: any[] }) => React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ onSearch, children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    } else {
      // fallback: búsqueda directa y manejo de error 404
      try {
        await apiService.getProducts(searchValue);
        // Si no hay error, recargar la página o navegar a home
        window.location.href = `/?search=${encodeURIComponent(searchValue)}`;
      } catch (err: any) {
        if (err.message && (err.message.includes('Product not found') || err.message.includes('404'))) {
          navigate('/notfound');
        }
      }
    }
  };

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product]);
    alert('Producto agregado al carrito');
  };

  return (
    <>
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
          <form className="nav-search" role="search" onSubmit={handleSubmit}>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Buscar productos, marcas y más…"
              maxLength={120}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoComplete="off"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
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
            <a href="#" className="nav-icon-btn" title="Carrito" onClick={e => { e.preventDefault(); alert(cart.length > 0 ? JSON.stringify(cart, null, 2) : 'El carrito está vacío'); }}>
              <span className="nav-icon-cart" />
              {cart.length > 0 && <span style={{marginLeft: 4, fontWeight: 'bold', color: '#3483fa'}}>{cart.length}</span>}
            </a>
          </div>
        </div>
      </header>
      {children && children({ handleAddToCart, cart })}
    </>
  );
};

export default Header; 