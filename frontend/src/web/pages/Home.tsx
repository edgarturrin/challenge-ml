import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";
import apiService from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Obteniendo productos desde BFF...');
        const response = await apiService.getProducts();
        setProducts(response.data);
        console.log(`Productos obtenidos exitosamente (${response.length} productos)`);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
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
        <Header />
        <div className="home-container">
          <h1 className="home-title">Productos destacados</h1>
          <div className="error">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header /> 
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