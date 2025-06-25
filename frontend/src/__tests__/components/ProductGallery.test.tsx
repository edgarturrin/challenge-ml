import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductGallery from '../../web/pages/components/ProductGallery';

const mockImages = [
  'https://http2.mlstatic.com/D_NQ_NP_633374-MLA82692302836_032025-O.webp',
  'https://http2.mlstatic.com/D_NQ_NP_671639-MLA82692302840_032025-O.webp',
  'https://http2.mlstatic.com/D_NQ_NP_737323-MLA74420223492_022024-O.webp'
];

const mockSetMainImage = jest.fn();

describe('ProductGallery', () => {
  beforeEach(() => {
    mockSetMainImage.mockClear();
  });

  it('renders gallery with images', () => {
    render(
      <ProductGallery 
        images={mockImages} 
        mainImage={mockImages[0]} 
        setMainImage={mockSetMainImage} 
      />
    );
    
    expect(screen.getByAltText(/Producto/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Miniatura 1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Miniatura 2/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Miniatura 3/i)).toBeInTheDocument();
  });

  it('renders gallery with single image', () => {
    const singleImage = [mockImages[0]];
    
    render(
      <ProductGallery 
        images={singleImage} 
        mainImage={singleImage[0]} 
        setMainImage={mockSetMainImage} 
      />
    );
    
    expect(screen.getByAltText(/Producto/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Miniatura 1/i)).toBeInTheDocument();
  });

  it('shows no images message when images array is empty', () => {
    render(
      <ProductGallery 
        images={[]} 
        mainImage="" 
        setMainImage={mockSetMainImage} 
      />
    );
    
    expect(screen.getByText('No hay imágenes disponibles')).toBeInTheDocument();
    expect(screen.queryByAltText(/Producto/i)).not.toBeInTheDocument();
  });

  it('shows no images message when images is null', () => {
    render(
      <ProductGallery 
        images={null} 
        mainImage="" 
        setMainImage={mockSetMainImage} 
      />
    );
    
    expect(screen.getByText('No hay imágenes disponibles')).toBeInTheDocument();
    expect(screen.queryByAltText(/Producto/i)).not.toBeInTheDocument();
  });

  it('shows no images message when images is undefined', () => {
    render(
      <ProductGallery 
        images={undefined} 
        mainImage="" 
        setMainImage={mockSetMainImage} 
      />
    );
    
    expect(screen.getByText('No hay imágenes disponibles')).toBeInTheDocument();
    expect(screen.queryByAltText(/Producto/i)).not.toBeInTheDocument();
  });

  it('shows no images message when images is not an array', () => {
    render(
      <ProductGallery 
        images="not-an-array" 
        mainImage="" 
        setMainImage={mockSetMainImage} 
      />
    );
    
    expect(screen.getByText('No hay imágenes disponibles')).toBeInTheDocument();
    expect(screen.queryByAltText(/Producto/i)).not.toBeInTheDocument();
  });

  it('calls setMainImage when thumbnail is clicked', () => {
    render(
      <ProductGallery 
        images={mockImages} 
        mainImage={mockImages[0]} 
        setMainImage={mockSetMainImage} 
      />
    );
    
    const secondThumbnail = screen.getByAltText(/Miniatura 2/i);
    fireEvent.click(secondThumbnail);
    
    expect(mockSetMainImage).toHaveBeenCalledWith(mockImages[1]);
  });

  it('applies active class to current main image thumbnail', () => {
    render(
      <ProductGallery 
        images={mockImages} 
        mainImage={mockImages[1]} 
        setMainImage={mockSetMainImage} 
      />
    );
    
    const secondThumbnail = screen.getByAltText(/Miniatura 2/i);
    expect(secondThumbnail).toHaveClass('ml-gallery__thumb--active');
    
    const firstThumbnail = screen.getByAltText(/Miniatura 1/i);
    expect(firstThumbnail).not.toHaveClass('ml-gallery__thumb--active');
  });

  it('displays main image correctly', () => {
    render(
      <ProductGallery 
        images={mockImages} 
        mainImage={mockImages[2]} 
        setMainImage={mockSetMainImage} 
      />
    );
    
    const mainImage = screen.getByAltText(/Producto/i);
    expect(mainImage).toHaveAttribute('src', mockImages[2]);
    expect(mainImage).toHaveClass('ml-gallery__main-img');
  });

  it('calls setMainImage multiple times when different thumbnails are clicked', () => {
    render(
      <ProductGallery 
        images={mockImages} 
        mainImage={mockImages[0]} 
        setMainImage={mockSetMainImage} 
      />
    );
    
    const firstThumbnail = screen.getByAltText(/Miniatura 1/i);
    const thirdThumbnail = screen.getByAltText(/Miniatura 3/i);
    
    fireEvent.click(thirdThumbnail);
    fireEvent.click(firstThumbnail);
    
    expect(mockSetMainImage).toHaveBeenCalledTimes(2);
    expect(mockSetMainImage).toHaveBeenNthCalledWith(1, mockImages[2]);
    expect(mockSetMainImage).toHaveBeenNthCalledWith(2, mockImages[0]);
  });
}); 