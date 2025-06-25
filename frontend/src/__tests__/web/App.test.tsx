import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../../web/App';

// Mock the pages
jest.mock('../../web/pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('../../web/pages/Detail', () => {
  return function MockDetail({ id }: { id?: string }) {
    return <div data-testid="detail-page">Detail Page - ID: {id || 'undefined'}</div>;
  };
});

const MockApp = ({ initialEntries = ['/'] }: { initialEntries?: string[] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <App />
  </MemoryRouter>
);

describe('App', () => {
  it('renders home page on root route', () => {
    render(<MockApp />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders detail page with id parameter', () => {
    render(<MockApp initialEntries={['/MLA32427104']} />);
    
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    expect(screen.getByText('Detail Page - ID: MLA32427104')).toBeInTheDocument();
  });

  it('renders detail page with different id parameter', () => {
    render(<MockApp initialEntries={['/MLA12345678']} />);
    
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    expect(screen.getByText('Detail Page - ID: MLA12345678')).toBeInTheDocument();
  });

  it('renders detail page with undefined id parameter', () => {
    render(<MockApp initialEntries={['/invalid-route']} />);
    
    // Should render the detail page but with undefined id
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
    expect(screen.getByText('Detail Page - ID: invalid-route')).toBeInTheDocument();
  });
}); 