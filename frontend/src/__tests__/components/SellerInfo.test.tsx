import React from 'react';
import { render, screen } from '@testing-library/react';
import SellerInfo from '../../web/pages/components/SellerInfo';

describe('SellerInfo', () => {
  const mockSeller = {
    id: 12345,
    name: 'Samsung Argentina',
    reputation: {
      level: 'platinum',
      transactions_completed: 15000,
      rating: 4.8
    },
    is_official_store: true,
    image: 'https://example.com/seller-logo.png'
  };

  it('renders seller information correctly', () => {
    render(<SellerInfo seller={mockSeller} />);
    
    expect(screen.getByText('Samsung Argentina')).toBeInTheDocument();
    expect(screen.getByText(/15,000.*Ventas/)).toBeInTheDocument();
    expect(screen.getByText(/⭐.*4\.8\/5/)).toBeInTheDocument();
    expect(screen.getByText('Tienda Oficial')).toBeInTheDocument();
    expect(screen.getByText('MercadoLíder Platinum')).toBeInTheDocument();
    expect(screen.getByText('Ir a la página del vendedor')).toBeInTheDocument();
  });

  it('renders non-official store correctly', () => {
    const nonOfficialSeller = {
      ...mockSeller,
      is_official_store: false
    };
    
    render(<SellerInfo seller={nonOfficialSeller} />);
    
    expect(screen.getByText('Vendedor')).toBeInTheDocument();
    expect(screen.queryByText('Tienda Oficial')).not.toBeInTheDocument();
  });

  it('renders non-platinum seller correctly', () => {
    const nonPlatinumSeller = {
      ...mockSeller,
      reputation: {
        ...mockSeller.reputation,
        level: 'gold'
      }
    };
    
    render(<SellerInfo seller={nonPlatinumSeller} />);
    
    expect(screen.getByText('Vendedor')).toBeInTheDocument();
    expect(screen.queryByText('MercadoLíder Platinum')).not.toBeInTheDocument();
  });

  it('renders seller with different reputation level', () => {
    const silverSeller = {
      ...mockSeller,
      reputation: {
        ...mockSeller.reputation,
        level: 'silver'
      }
    };
    
    render(<SellerInfo seller={silverSeller} />);
    
    expect(screen.getByText('silver')).toBeInTheDocument();
  });

  it('renders seller with zero transactions', () => {
    const newSeller = {
      ...mockSeller,
      reputation: {
        ...mockSeller.reputation,
        transactions_completed: 0
      }
    };
    
    render(<SellerInfo seller={newSeller} />);
    
    expect(screen.getByText('+0 Ventas')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders seller with low rating', () => {
    const lowRatingSeller = {
      ...mockSeller,
      reputation: {
        ...mockSeller.reputation,
        rating: 2.1
      }
    };
    
    render(<SellerInfo seller={lowRatingSeller} />);
    
    expect(screen.getByText('⭐ 2.1/5')).toBeInTheDocument();
  });

  it('renders seller with perfect rating', () => {
    const perfectSeller = {
      ...mockSeller,
      reputation: {
        ...mockSeller.reputation,
        rating: 5.0
      }
    };
    
    render(<SellerInfo seller={perfectSeller} />);
    
    expect(screen.getByText('⭐ 5/5')).toBeInTheDocument();
  });

  it('renders seller link with encoded name', () => {
    const sellerWithSpaces = {
      ...mockSeller,
      name: 'Samsung Electronics Argentina'
    };
    
    render(<SellerInfo seller={sellerWithSpaces} />);
    
    const link = screen.getByText('Ir a la página del vendedor');
    expect(link).toHaveAttribute('href', 'https://www.mercadolibre.com.ar/perfil/Samsung+Electronics+Argentina');
  });

  it('renders seller stats correctly', () => {
    render(<SellerInfo seller={mockSeller} />);
    
    expect(screen.getByText('15,000')).toBeInTheDocument();
    expect(screen.getByText('Ventas concretadas')).toBeInTheDocument();
    expect(screen.getByText('4.8/5 Calificación')).toBeInTheDocument();
    expect(screen.getByText('platinum')).toBeInTheDocument();
  });

  it('renders seller image with alt text', () => {
    render(<SellerInfo seller={mockSeller} />);
    
    const image = screen.getByAltText('Samsung Argentina');
    expect(image).toHaveAttribute('src', 'https://example.com/seller-logo.png');
  });

  it('renders follow button', () => {
    render(<SellerInfo seller={mockSeller} />);
    
    expect(screen.getByText('Seguir')).toBeInTheDocument();
  });

  it('renders reputation bar with correct width', () => {
    render(<SellerInfo seller={mockSeller} />);
    
    const reputationFill = document.querySelector('.seller-reputation-fill');
    expect(reputationFill).toHaveStyle('width: 96%'); // 4.8/5 * 100 = 96%
  });
}); 