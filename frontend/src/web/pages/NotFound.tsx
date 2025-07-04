import React from "react";
import Header from "./components/Header";

const NotFound = () => (
  <>
    <Header />
    <div className="notfound-container">
      <h1>Página no encontrada</h1>
      <p>No se encontró el recurso solicitado o la búsqueda contiene palabras no permitidas.</p>
    </div>
  </>
);

export default NotFound; 