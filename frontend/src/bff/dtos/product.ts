export interface ProductDetail {
    id: string;
    title: string;
    price: number;
    discount: number;
    installments: string;
    stock: number;
    preferred_image: string;
    images: string[];
    color: string;
    memory: string;
    description: string;
    features: Feature[];
    payment_methods: PaymentMethods;
    seller: Seller;
  }
  
  export interface Feature {
    label: string;
    value: string;
  }
  
  export interface PaymentMethods {
    installments_bold: string;
    cardless_installments: CardlessInstallment[];
    credit_cards: Card[];
    debit_cards: Card[];
    more: string;
  }
  
  export interface CardlessInstallment {
    name: string;
    logo: string;
  }
  
  export interface Card {
    name: string;
    logo: string;
  }
  
  export interface Seller {
    id: string;
    name: string;
    image: string;
    rating: number;
    reputation: Reputation;
    is_official_store: boolean;
  }
  
  export interface Reputation {
    level: string;
    transactions_completed: number;
    rating: number;
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
  }
  