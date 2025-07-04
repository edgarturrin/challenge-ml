import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";
import apiService from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (searchValue = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getProducts(searchValue);
      setProducts(response.data);
    } catch (err) {
      if (err.message && (err.message.includes('Product not found') || err.message.includes('404'))) {
        navigate('/notfound');
        return;
      }
      setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <div className="home-container">
          <h1 className="home-title">Productos destacados</h1>
          <LoadingSpinner message="Cargando productos..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <div className="home-container">
          <h1 className="home-title">Productos destacados</h1>
          <div className="error">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="home-container">
        <h1 className="home-title">Productos destacados</h1>
        <div className="home-grid">
          {!products || products.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron productos</p>
            </div>
          ) : (
            products.map((element, index) => (
              <ProductCard key={index} {...element} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home; 