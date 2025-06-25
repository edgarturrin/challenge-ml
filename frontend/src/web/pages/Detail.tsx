import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductDescription from "./components/ProductDescription";
import PaymentMethods from "./components/PaymentMethods";
import SellerInfo from "./components/SellerInfo";
import LoadingSpinner from "./components/LoadingSpinner";
import apiService from "../services/api";

const Detail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Obteniendo producto ${id} desde BFF...`);
        const response = await apiService.getProductById(id);
        setProduct(response.data);
        setMainImage(response.data.preferred_image || response.data.images?.[0]);
        console.log(`Producto ${id} obtenido exitosamente`);
      } catch (err) {
        console.error(`Error al obtener producto ${id}:`, err);
        setError('Error al cargar el producto. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="ml-detail-layout">
          <LoadingSpinner message="Cargando producto..." />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="ml-detail-layout">
          <div className="error">
            {error || 'Producto no encontrado'}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="ml-detail-layout">
        <div className="ml-detail-main-row">
          <ProductGallery 
            images={product.images} 
            mainImage={mainImage} 
            setMainImage={setMainImage} 
          />
          <ProductInfo
            title={product.title}
            price={product.price}
            discount={product.discount}
            installments={product.installments}
            stock={product.stock}
            color={product.color}
            memory={product.memory}
            features={product.features}
          />
          <div className="ml-detail-sidebar">
            <PaymentMethods payment_methods={product.payment_methods} />
            <SellerInfo seller={product.seller} />
          </div>
        </div>
        <ProductDescription description={product.description} />
      </div>
    </>
  );
};

export default Detail; 