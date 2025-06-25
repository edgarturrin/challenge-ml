import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../web/pages/components/Header';

// Mock del componente Header
const MockHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header', () => {
  it('renders header with logo', () => {
    render(<MockHeader />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText(/Mercado Libre/i)).toBeInTheDocument();
  });
}); 