import React from "react";

const ProductGallery = ({ images, mainImage, setMainImage }) => {
  // Verificaciones de seguridad
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="ml-gallery">
        <div className="ml-gallery__main">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '320px',
            color: '#666',
            fontSize: '16px'
          }}>
            No hay imágenes disponibles
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-gallery">
      <div className="ml-gallery__thumbnails">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Miniatura ${idx + 1}`}
            className={`ml-gallery__thumb${mainImage === img ? ' ml-gallery__thumb--active' : ''}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
      <div className="ml-gallery__main">
        <img src={mainImage} alt="Producto" className="ml-gallery__main-img" />
      </div>
    </div>
  );
};

export default ProductGallery; 