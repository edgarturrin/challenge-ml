import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../web/pages/components/ProductCard';

// Mock del componente ProductCard
const MockProductCard = ({ id, title, price, image }: { id: string; title: string; price: number; image: string }) => (
  <BrowserRouter>
    <ProductCard id={id} title={title} price={price} image={image} />
  </BrowserRouter>
);

const mockProduct = {
  id: 'MLA32427104',
  title: 'Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM',
  price: 329999,
  image: 'https://http2.mlstatic.com/D_NQ_NP_633374-MLA82692302836_032025-O.webp'
};

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<MockProductCard {...mockProduct} />);
    
    expect(screen.getByText(/Samsung Galaxy A15/i)).toBeInTheDocument();
    expect(screen.getByText(/329,999/)).toBeInTheDocument();
    expect(screen.getByText('Ver detalle')).toBeInTheDocument();
  });
}); 