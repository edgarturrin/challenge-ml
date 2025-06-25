import React from "react";

interface PaymentMethod {
  name: string;
  logo: string;
}

interface PaymentMethods {
  installments_bold: string;
  cardless_installments: PaymentMethod[];
  credit_cards: PaymentMethod[];
  debit_cards: PaymentMethod[];
  more: string;
}

interface PaymentMethodsProps {
  payment_methods: PaymentMethods;
}

const PaymentMethods = ({ payment_methods }: PaymentMethodsProps) => (
  <div className="pm-box">
    <h3 className="pm-title">Medios de pago</h3>
    <div className="pm-cuotas">
      <span className="pm-cuotas-svg">
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="none" fillRule="evenodd">
            <rect fill="#fff" fillOpacity="0" width="20" height="20" rx="2"/>
            <rect stroke="#fff" strokeWidth="1.2" x="3.6" y="6.6" width="12.8" height="6.8" rx="1.4"/>
            <rect fill="#fff" x="5.5" y="8.5" width="2.2" height="2.2" rx="1.1"/>
            <rect fill="#fff" x="8.9" y="8.5" width="2.2" height="2.2" rx="1.1"/>
            <rect fill="#fff" x="12.3" y="8.5" width="2.2" height="2.2" rx="1.1"/>
          </g>
        </svg>
      </span>
      <span>
        ¡Pagá el mismo precio en <b>{payment_methods.installments_bold}</b>!
      </span>
    </div>
    <div className="pm-section">
      <div className="pm-label">Cuotas sin Tarjeta</div>
      <div className="pm-logos">
        {payment_methods.cardless_installments?.map((m) => (
          <img key={m.name} src={m.logo} alt={m.name} className="pm-logo" />
        ))}
      </div>
    </div>
    <div className="pm-section">
      <div className="pm-label">Tarjetas de crédito</div>
      <div className="pm-logos">
        {payment_methods.credit_cards?.map((m) => (
          <img key={m.name} src={m.logo} alt={m.name} className="pm-logo" />
        ))}
      </div>
    </div>
    <div className="pm-section">
      <div className="pm-label">Tarjetas de débito</div>
      <div className="pm-logos">
        {payment_methods.debit_cards?.map((m) => (
          <img key={m.name} src={m.logo} alt={m.name} className="pm-logo" />
        ))}
      </div>
    </div>
    <a href="#" className="pm-more">{payment_methods.more}</a>
  </div>
);

export default PaymentMethods; 