import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDescription from '../../web/pages/components/ProductDescription';

const mockDescription = 'Samsung Galaxy A15 2023 con pantalla de 6.5″ HD+ de 90 Hz, procesador MediaTek Helio G85 y cámara triple de 50MP. Incluye 128GB de almacenamiento y 4GB de RAM.';

describe('ProductDescription', () => {
  it('renders product description', () => {
    render(<ProductDescription description={mockDescription} />);
    
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });
}); 