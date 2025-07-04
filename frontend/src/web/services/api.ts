interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

class ApiService {

  async request(endpoint: string, options: RequestOptions = {}) {
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(endpoint, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error en llamada a API (${endpoint}):`, error);
      throw error;
    }
  }

  // Obtener todos los productos
  async getProducts(search?: string) {
    let endpoint = '/api/products/search';
    if (search && search.trim() !== "") {
      endpoint += `?search=${encodeURIComponent(search)}`;
    }
    return this.request(endpoint);
  }

  // Obtener un producto específico por ID
  async getProductById(id: string) {
    return this.request(`/api/products/${id}`);
  }
}

// Instancia singleton del servicio
const apiService = new ApiService();

export default apiService; 