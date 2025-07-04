import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../web/pages/components/Header';

// Mock del componente Header con prop onSearch
const MockHeader = (props) => (
  <BrowserRouter>
    <Header {...props}>
      {() => null}
    </Header>
  </BrowserRouter>
);

describe('Header', () => {
  it('renders header with logo', () => {
    render(<MockHeader />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText(/Mercado Libre/i)).toBeInTheDocument();
  });

  it('llama a onSearch con el valor ingresado al hacer submit', () => {
    const onSearchMock = jest.fn();
    render(<MockHeader onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/Buscar productos/i);
    const button = screen.getByRole('button', { name: /Buscar/i });
    // Simular ingreso de texto
    input.focus();
    (input as HTMLInputElement).value = 'celular';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    // Simular submit
    button.click();
    expect(onSearchMock).toHaveBeenCalledWith('celular');
  });
}); 