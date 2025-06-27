import React from 'react';

const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__spinner"></div>
      <p className="loading-spinner__message">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 