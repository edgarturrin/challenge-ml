import { ProductService, ProductServiceConfig } from '../../../bff/services';

describe('Services Exports', () => {
  it('should export ProductService class', () => {
    expect(ProductService).toBeDefined();
    expect(typeof ProductService).toBe('function');
  });

  it('should allow creating ProductService instance', () => {
    const config: ProductServiceConfig = {
      baseURL: 'http://localhost:3000'
    };
    
    const service = new ProductService(config);
    expect(service).toBeInstanceOf(ProductService);
  });
}); 