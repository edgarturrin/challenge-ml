import apiService from '../../web/services/api';

global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it('fetches products successfully', async () => {
    const mockProducts = [
      {
        id: 'MLA32427104',
        title: 'Samsung Galaxy A15',
        price: 329999,
        image: 'https://example.com/image.jpg'
      }
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockProducts })
    });

    const result = await apiService.getProducts();

    expect(fetch).toHaveBeenCalledWith('/api/products/search', expect.objectContaining({
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      })
    }));
    expect(result).toEqual({ data: mockProducts });
  });

  it('fetches product by ID successfully', async () => {
    const mockProduct = {
      id: 'MLA32427104',
      title: 'Samsung Galaxy A15',
      price: 329999,
      description: 'Descripción del producto'
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockProduct })
    });

    const result = await apiService.getProductById('MLA32427104');

    expect(fetch).toHaveBeenCalledWith('/api/products/MLA32427104', expect.objectContaining({
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      })
    }));
    expect(result).toEqual({ data: mockProduct });
  });

  it('handles API error with message', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal Server Error' })
    });

    await expect(apiService.getProducts()).rejects.toThrow('Internal Server Error');
  });

  it('handles API error without message', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({})
    });

    await expect(apiService.getProducts()).rejects.toThrow('HTTP error! status: 404');
  });

  it('handles API error when json parsing fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => { throw new Error('JSON parse error'); }
    });

    await expect(apiService.getProducts()).rejects.toThrow('HTTP error! status: 500');
  });

  it('handles network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(apiService.getProducts()).rejects.toThrow('Network error');
  });

  it('handles request with custom headers', async () => {
    const mockProducts = [{ id: 'MLA1', title: 'Product 1' }];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockProducts })
    });

    // Test internal request method with custom options
    const result = await (apiService as any).request('/api/products/search', {
      headers: { 'Authorization': 'Bearer token' },
      method: 'POST'
    });

    expect(fetch).toHaveBeenCalledWith('/api/products/search', expect.objectContaining({
      headers: expect.objectContaining({
        'Authorization': 'Bearer token'
      }),
      method: 'POST'
    }));
    expect(result).toEqual({ data: mockProducts });
  });

  it('handles request with additional options', async () => {
    const mockProducts = [{ id: 'MLA1', title: 'Product 1' }];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockProducts })
    });

    const result = await (apiService as any).request('/api/products/search', {
      method: 'GET',
      cache: 'no-cache'
    });

    expect(fetch).toHaveBeenCalledWith('/api/products/search', expect.objectContaining({
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      }),
      method: 'GET',
      cache: 'no-cache'
    }));
    expect(result).toEqual({ data: mockProducts });
  });

  it('logs error to console when request fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const networkError = new Error('Network error');

    (fetch as jest.Mock).mockRejectedValueOnce(networkError);

    await expect(apiService.getProducts()).rejects.toThrow('Network error');
    expect(consoleSpy).toHaveBeenCalledWith('Error en llamada a API (/api/products/search):', networkError);
    
    consoleSpy.mockRestore();
  });
}); 