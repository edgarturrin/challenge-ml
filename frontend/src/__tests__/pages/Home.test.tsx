import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../web/pages/Home';

// Mock del servicio de API
jest.mock('../../web/services/api', () => ({
  __esModule: true,
  default: {
    getProducts: jest.fn()
  }
}));

const mockApi = require('../../web/services/api').default;

const mockProducts = [
  {
    id: 'MLA32427104',
    title: 'Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM',
    price: 329999,
    image: 'https://http2.mlstatic.com/D_NQ_NP_633374-MLA82692302836_032025-O.webp'
  }
];

const MockHome = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders products list', async () => {
    mockApi.getProducts.mockResolvedValue({ data: mockProducts });
    
    render(<MockHome />);
    
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy A15/i)).toBeInTheDocument();
    });
  });

  it('renders empty state when no products', async () => {
    mockApi.getProducts.mockResolvedValue({ data: [] });
    
    render(<MockHome />);
    
    await waitFor(() => {
      expect(screen.getByText(/No se encontraron productos/i)).toBeInTheDocument();
    });
  });

  it('handles empty products array', async () => {
    mockApi.getProducts.mockResolvedValue({ data: [] });
    
    render(<MockHome />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    });
  });

  it('handles response with undefined data', async () => {
    mockApi.getProducts.mockResolvedValue({ data: undefined });
    
    render(<MockHome />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    });
  });

  it('handles response with null data', async () => {
    mockApi.getProducts.mockResolvedValue({ data: null });
    
    render(<MockHome />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    });
  });

  it('handles response without data property', async () => {
    mockApi.getProducts.mockResolvedValue({ products: mockProducts });
    
    render(<MockHome />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    });
  });
}); 