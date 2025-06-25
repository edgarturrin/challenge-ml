import express from 'express';
import { ProductService } from '../services';
const router = express.Router();

const productService = new ProductService({
  baseURL: process.env.API_CORE_URL
});

router.get('/search', async (req, res) => {
  try {
    const searchResults = await productService.searchProducts();

    res.json({
      code: 200,
      message: 'success',
      data: searchResults
    });
  } catch (error: any) {
    console.error('Error en búsqueda de productos:', error);
    
    // Si es un error del backend, preservar la información
    if (error.status && error.message) {
      return res.status(error.status).json({
        code: error.status,
        message: error.message,
        error: error.error,
        path: error.path,
        data: null
      });
    }
    
    // Error genérico
    res.status(500).json({
      code: 500,
      message: 'Error interno del servidor',
      data: null
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(400).json({
        code: 400,
        message: 'El ID del producto es requerido',
        data: null
      });
    }

    const productDetail = await productService.getProductById(id);

    res.json({
      code: 200,
      message: 'success',
      data: productDetail
    });
  } catch (error: any) {
    console.error('Error al obtener producto por ID:', error);
    
    if (error.status && error.message) {
      return res.status(error.status).json({
        code: error.status,
        message: error.message,
        error: error.error,
        path: error.path,
        data: null
      });
    }
    
    res.status(500).json({
      code: 500,
      message: 'Error interno del servidor',
      data: null
    });
  }
});

export default router;
