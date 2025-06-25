import React from "react";

const ProductDescription = ({ description }) => (
  <div className="ml-desc">
    <h2 className="ml-desc__title">Descripción</h2>
    <p className="ml-desc__text">{description}</p>
  </div>
);

export default ProductDescription; 