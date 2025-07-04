import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductInfo from '../../web/pages/components/ProductInfo';

describe('ProductInfo', () => {
  const mockProduct = {
    title: 'Samsung Galaxy A15',
    price: 329999,
    discount: 10,
    installments: 'Hasta 12 cuotas sin interés',
    stock: 15,
    color: 'Negro',
    memory: '128 GB',
    features: [
      { label: 'Pantalla', value: '6.5 pulgadas' },
      { label: 'RAM', value: '4 GB' }
    ]
  };

  it('renders without discount when discount is 0', () => {
    render(<ProductInfo {...mockProduct} discount={0} onAddToCart={jest.fn()} />);
    
    expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
  });

  it('renders without installments when installments is null', () => {
    render(<ProductInfo {...mockProduct} installments={null} onAddToCart={jest.fn()} />);
    
    expect(screen.queryByText('Hasta 12 cuotas sin interés')).not.toBeInTheDocument();
  });

  it('renders without installments when installments is empty string', () => {
    render(<ProductInfo {...mockProduct} installments="" onAddToCart={jest.fn()} />);
    
    expect(screen.queryByText('Hasta 12 cuotas sin interés')).not.toBeInTheDocument();
  });

  it('renders without features when features is null', () => {
    render(<ProductInfo {...mockProduct} features={null} onAddToCart={jest.fn()} />);
    
    expect(screen.queryByText('Características principales')).not.toBeInTheDocument();
  });

  it('renders without features when features is not an array', () => {
    render(<ProductInfo {...mockProduct} features="not an array" onAddToCart={jest.fn()} />);
    
    expect(screen.queryByText('Características principales')).not.toBeInTheDocument();
  });

  it('renders without features when features array is empty', () => {
    render(<ProductInfo {...mockProduct} features={[]} onAddToCart={jest.fn()} />);
    
    expect(screen.queryByText('Características principales')).not.toBeInTheDocument();
  });

  it('renders out of stock message when stock is 0', () => {
    render(<ProductInfo {...mockProduct} stock={0} onAddToCart={jest.fn()} />);
    
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    expect(screen.getByText('Sin stock')).toHaveClass('ml-info__stock--out');
  });

  it('renders out of stock message when stock is negative', () => {
    render(<ProductInfo {...mockProduct} stock={-5} onAddToCart={jest.fn()} />);
    
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    expect(screen.getByText('Sin stock')).toHaveClass('ml-info__stock--out');
  });

  it('renders buy and cart buttons', () => {
    render(<ProductInfo {...mockProduct} onAddToCart={jest.fn()} />);
    
    expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
    expect(screen.getByText('Agregar al carrito')).toBeInTheDocument();
  });

  it('renders sold info', () => {
    render(<ProductInfo {...mockProduct} onAddToCart={jest.fn()} />);
    
    expect(screen.getByText('Nuevo | +500 vendidos')).toBeInTheDocument();
  });
}); 