import React from 'react';
import { render, screen } from '@testing-library/react';
import PaymentMethods from '../../web/pages/components/PaymentMethods';

const mockPaymentMethods = {
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
};

describe('PaymentMethods', () => {
  it('renders payment methods', () => {
    render(<PaymentMethods payment_methods={mockPaymentMethods} />);
    
    expect(screen.getByText('18 cuotas sin interés')).toBeInTheDocument();
    expect(screen.getByAltText('Mercado Pago')).toBeInTheDocument();
    expect(screen.getByAltText('Visa')).toBeInTheDocument();
  });
}); 