import { ApiResponse } from '../dtos/apiresponse';
import { Product, ProductDetail } from '../dtos/product';
import { ApiGateway, ApiConfig } from './gateway';

export interface ProductServiceConfig {
  baseURL: string;
  timeout?: number;
}

export interface BackendError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export class ProductService {
  private gateway: ApiGateway;

  constructor(config: ProductServiceConfig) {
    const apiConfig: ApiConfig = {
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
    };
    
    this.gateway = new ApiGateway(apiConfig);
  }

  async searchProducts(): Promise<Product[]> {
    try {
      const response = await this.gateway.get<ApiResponse<Product[]>>(`/api-core/products/search`);
      return response.data?.data;
    } catch (error: any) {
      console.error('Error searching products:', error);
      
      if (error.response?.data) {
        const backendError: BackendError = error.response.data;
        throw {
          status: backendError.status,
          message: backendError.message,
          error: backendError.error,
          path: backendError.path
        };
      }
      
      throw new Error('Error al buscar productos');
    }
  }

  async getProductById(id: string): Promise<ProductDetail> {
    try {
      const response = await this.gateway.get<ApiResponse<ProductDetail>>(`/api-core/products/${id}`);
      return response.data?.data;
    } catch (error: any) {
      console.error('Error getting product by id:', error);
      
      if (error.response?.data) {
        const backendError: BackendError = error.response.data;
        throw {
          status: backendError.status,
          message: backendError.message,
          error: backendError.error,
          path: backendError.path
        };
      }
      
      throw new Error(`Error al obtener el producto con ID: ${id}`);
    }
  }
}
