import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Detail from '../../web/pages/Detail';

// Mock del servicio de API
jest.mock('../../web/services/api', () => ({
  __esModule: true,
  default: {
    getProductById: jest.fn()
  }
}));

const mockApi = require('../../web/services/api').default;

const mockProductDetail = {
  id: 'MLA32427104',
  title: 'Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM',
  description: 'Samsung Galaxy A15 2023 con pantalla de 6.5″ HD+ de 90 Hz...',
  price: 329999,
  stock: 91,
  discount: 15,
  installments: 'Hasta 18 cuotas sin interés',
  preferred_image: 'https://http2.mlstatic.com/D_NQ_NP_633374-MLA82692302836_032025-O.webp',
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_671639-MLA82692302840_032025-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_737323-MLA74420223492_022024-O.webp'
  ],
  features: [
    { label: 'Pantalla', value: '6.5″ HD+ 90 Hz' },
    { label: 'Procesador', value: 'MediaTek Helio G85' }
  ],
  seller: {
    id: 12345678,
    name: 'Samsung Oficial',
    reputation: {
      level: 'platinum',
      transactions_completed: 156789,
      rating: 4.9
    },
    is_official_store: true,
    image: 'https://http2.mlstatic.com/D_NQ_NP_887675-MLA74823588370_032024-G.jpg'
  },
  payment_methods: {
    installments_bold: '18 cuotas sin interés',
    cardless_installments: [
      { name: 'Mercado Pago', logo: 'https://example.com/mercadopago.svg' }
    ],
    credit_cards: [
      { name: 'Visa', logo: 'https://example.com/visa.svg' }
    ],
    debit_cards: [
      { name: 'Visa Débito', logo: 'https://example.com/visa-debito.svg' }
    ],
    more: 'Ver más medios de pago'
  }
};

const MockDetail = ({ id }: { id: string }) => (
  <BrowserRouter>
    <Detail id={id} />
  </BrowserRouter>
);

describe('Detail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product detail', async () => {
    mockApi.getProductById.mockResolvedValue({ data: mockProductDetail });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
  });

  it('renders loading state initially', () => {
    mockApi.getProductById.mockResolvedValue({ data: mockProductDetail });
    
    render(<MockDetail id="MLA32427104" />);
    
    expect(screen.getByText('Cargando producto...')).toBeInTheDocument();
  });

  it('handles API error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockApi.getProductById.mockRejectedValue(new Error('API Error'));
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar el producto. Por favor, inténtalo de nuevo.')).toBeInTheDocument();
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener producto MLA32427104:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('shows product not found when product is null', async () => {
    mockApi.getProductById.mockResolvedValue({ data: null });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar el producto. Por favor, inténtalo de nuevo.')).toBeInTheDocument();
    });
  });

  it('uses preferred_image when available', async () => {
    const productWithPreferredImage = {
      ...mockProductDetail,
      preferred_image: 'https://example.com/preferred.jpg'
    };
    
    mockApi.getProductById.mockResolvedValue({ data: productWithPreferredImage });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
  });

  it('uses first image when preferred_image is not available', async () => {
    const productWithoutPreferredImage = {
      ...mockProductDetail,
      preferred_image: null
    };
    
    mockApi.getProductById.mockResolvedValue({ data: productWithoutPreferredImage });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
  });

  it('handles product without images array', async () => {
    const productWithoutImages = {
      ...mockProductDetail,
      images: null
    };
    
    mockApi.getProductById.mockResolvedValue({ data: productWithoutImages });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
  });

  it('does not fetch product when id is not provided', () => {
    render(<MockDetail id="" />);
    
    expect(mockApi.getProductById).not.toHaveBeenCalled();
  });

  it('does not fetch product when id is null', async () => {
    render(<MockDetail id={null} />);
    
    await waitFor(() => {
      expect(mockApi.getProductById).not.toHaveBeenCalled();
    });
  });

  it('does not fetch product when id is undefined', async () => {
    render(<MockDetail id={undefined} />);
    
    await waitFor(() => {
      expect(mockApi.getProductById).not.toHaveBeenCalled();
    });
  });

  it('logs success message when product is fetched', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    mockApi.getProductById.mockResolvedValue({ data: mockProductDetail });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Obteniendo producto MLA32427104 desde BFF...');
    expect(consoleSpy).toHaveBeenCalledWith('Producto MLA32427104 obtenido exitosamente');
    consoleSpy.mockRestore();
  });

  it('renders all product components when data is available', async () => {
    mockApi.getProductById.mockResolvedValue({ data: mockProductDetail });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      // Check that all main components are rendered
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
      expect(screen.getByText('Samsung Galaxy A15 2023 con pantalla de 6.5″ HD+ de 90 Hz...')).toBeInTheDocument();
      expect(screen.getByText('Samsung Oficial')).toBeInTheDocument();
    });
  });

  it('uses first image when preferred_image is not available', async () => {
    const mockProductWithoutPreferred = {
      ...mockProductDetail,
      preferred_image: null,
      images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
    };
    
    mockApi.getProductById.mockResolvedValue({ data: mockProductWithoutPreferred });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
  });

  it('handles product without images array', async () => {
    const mockProductWithoutImages = {
      ...mockProductDetail,
      preferred_image: null,
      images: null
    };
    
    mockApi.getProductById.mockResolvedValue({ data: mockProductWithoutImages });
    
    render(<MockDetail id="MLA32427104" />);
    
    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM')).toBeInTheDocument();
    });
  });
}); 