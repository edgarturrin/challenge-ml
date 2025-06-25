import { ProductService, ProductServiceConfig } from '../../../bff/services/product';
import { ApiGateway } from '../../../bff/services/gateway';

// Mock ApiGateway
jest.mock('../../../bff/services/gateway');
const MockedApiGateway = ApiGateway as jest.MockedClass<typeof ApiGateway>;

describe('ProductService', () => {
  let productService: ProductService;
  let mockGateway: jest.Mocked<ApiGateway>;

  const mockConfig: ProductServiceConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 5000
  };

  beforeEach(() => {
    mockGateway = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn()
    } as any;

    MockedApiGateway.mockImplementation(() => mockGateway);
    productService = new ProductService(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create ApiGateway with correct config', () => {
      expect(MockedApiGateway).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3000',
        timeout: 5000
      });
    });

    it('should use default timeout when not provided', () => {
      const configWithoutTimeout: ProductServiceConfig = {
        baseURL: 'http://localhost:3000'
      };

      new ProductService(configWithoutTimeout);

      expect(MockedApiGateway).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3000',
        timeout: 10000
      });
    });
  });

  describe('searchProducts', () => {
    it('should return products successfully', async () => {
      const mockProducts = [
        { id: 'MLA1', title: 'Product 1', price: 100 },
        { id: 'MLA2', title: 'Product 2', price: 200 }
      ];

      const mockResponse = {
        data: {
          data: mockProducts
        },
        status: 200,
        statusText: 'OK'
      };

      mockGateway.get.mockResolvedValue(mockResponse);

      const result = await productService.searchProducts();

      expect(mockGateway.get).toHaveBeenCalledWith('/api-core/products/search');
      expect(result).toEqual(mockProducts);
    });

    it('should handle backend errors with status and message', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const backendError = {
        response: {
          data: {
            status: 404,
            message: 'Products not found',
            error: 'NOT_FOUND',
            path: '/api-core/products/search'
          }
        }
      };

      mockGateway.get.mockRejectedValue(backendError);

      await expect(productService.searchProducts()).rejects.toEqual({
        status: 404,
        message: 'Products not found',
        error: 'NOT_FOUND',
        path: '/api-core/products/search'
      });

      expect(consoleSpy).toHaveBeenCalledWith('Error searching products:', backendError);
      consoleSpy.mockRestore();
    });

    it('should handle generic errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const genericError = new Error('Network error');

      mockGateway.get.mockRejectedValue(genericError);

      await expect(productService.searchProducts()).rejects.toThrow('Error al buscar productos');

      expect(consoleSpy).toHaveBeenCalledWith('Error searching products:', genericError);
      consoleSpy.mockRestore();
    });

    it('should handle errors without response data', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const errorWithoutResponse = new Error('Some error');

      mockGateway.get.mockRejectedValue(errorWithoutResponse);

      await expect(productService.searchProducts()).rejects.toThrow('Error al buscar productos');

      expect(consoleSpy).toHaveBeenCalledWith('Error searching products:', errorWithoutResponse);
      consoleSpy.mockRestore();
    });
  });

  describe('getProductById', () => {
    it('should return product detail successfully', async () => {
      const mockProductDetail = {
        id: 'MLA1',
        title: 'Product 1',
        price: 100,
        description: 'Product description',
        pictures: ['url1', 'url2']
      };

      const mockResponse = {
        data: {
          data: mockProductDetail
        },
        status: 200,
        statusText: 'OK'
      };

      mockGateway.get.mockResolvedValue(mockResponse);

      const result = await productService.getProductById('MLA1');

      expect(mockGateway.get).toHaveBeenCalledWith('/api-core/products/MLA1');
      expect(result).toEqual(mockProductDetail);
    });

    it('should handle backend errors with status and message', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const backendError = {
        response: {
          data: {
            status: 404,
            message: 'Product not found',
            error: 'NOT_FOUND',
            path: '/api-core/products/MLA999'
          }
        }
      };

      mockGateway.get.mockRejectedValue(backendError);

      await expect(productService.getProductById('MLA999')).rejects.toEqual({
        status: 404,
        message: 'Product not found',
        error: 'NOT_FOUND',
        path: '/api-core/products/MLA999'
      });

      expect(consoleSpy).toHaveBeenCalledWith('Error getting product by id:', backendError);
      consoleSpy.mockRestore();
    });

    it('should handle generic errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const genericError = new Error('Network error');

      mockGateway.get.mockRejectedValue(genericError);

      await expect(productService.getProductById('MLA1')).rejects.toThrow('Error al obtener el producto con ID: MLA1');

      expect(consoleSpy).toHaveBeenCalledWith('Error getting product by id:', genericError);
      consoleSpy.mockRestore();
    });

    it('should handle errors without response data', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const errorWithoutResponse = new Error('Some error');

      mockGateway.get.mockRejectedValue(errorWithoutResponse);

      await expect(productService.getProductById('MLA1')).rejects.toThrow('Error al obtener el producto con ID: MLA1');

      expect(consoleSpy).toHaveBeenCalledWith('Error getting product by id:', errorWithoutResponse);
      consoleSpy.mockRestore();
    });
  });
}); 