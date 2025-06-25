import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../web/pages/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading message', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
}); 