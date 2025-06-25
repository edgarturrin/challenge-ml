package com.challenge.api.dto.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PaymentMethodsTest {

    @Test
    public void testPaymentMethodsGettersAndSetters() {
        // Arrange
        ProductDetail.PaymentMethods paymentMethods = new ProductDetail.PaymentMethods();
        
        // Act
        paymentMethods.setInstallmentsBold("18 cuotas sin interés");
        
        // Set cardless installments
        ProductDetail.PaymentMethods.CardlessInstallments cardless = new ProductDetail.PaymentMethods.CardlessInstallments();
        cardless.setName("Mercado Pago");
        cardless.setLogo("https://http2.mlstatic.com/storage/logos-api-admin/f3e8e940-f549-11ef-bad6-e9962bcd76e5-m.svg");
        
        paymentMethods.setCardlessInstallments(new ProductDetail.PaymentMethods.CardlessInstallments[]{cardless});
        
        // Set credit cards
        ProductDetail.PaymentMethods.Card creditCard1 = new ProductDetail.PaymentMethods.Card();
        creditCard1.setName("Visa");
        creditCard1.setLogo("https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg");
        
        ProductDetail.PaymentMethods.Card creditCard2 = new ProductDetail.PaymentMethods.Card();
        creditCard2.setName("Mastercard");
        creditCard2.setLogo("https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg");
        
        ProductDetail.PaymentMethods.Card creditCard3 = new ProductDetail.PaymentMethods.Card();
        creditCard3.setName("American Express");
        creditCard3.setLogo("https://http2.mlstatic.com/storage/logos-api-admin/b4785730-c13f-11ee-b4b3-bb9a23b70639-m.svg");
        
        paymentMethods.setCreditCards(new ProductDetail.PaymentMethods.Card[]{creditCard1, creditCard2, creditCard3});
        
        // Set debit cards
        ProductDetail.PaymentMethods.Card debitCard1 = new ProductDetail.PaymentMethods.Card();
        debitCard1.setName("Visa Débito");
        debitCard1.setLogo("https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg");
        
        ProductDetail.PaymentMethods.Card debitCard2 = new ProductDetail.PaymentMethods.Card();
        debitCard2.setName("Mastercard Débito");
        debitCard2.setLogo("https://http2.mlstatic.com/storage/logos-api-admin/157dce60-571b-11e8-95d8-631c1a9a92a9-m.svg");
        
        paymentMethods.setDebitCards(new ProductDetail.PaymentMethods.Card[]{debitCard1, debitCard2});
        
        paymentMethods.setMore("Ver más medios de pago");
        
        // Assert
        assertEquals("18 cuotas sin interés", paymentMethods.getInstallmentsBold());
        
        // Assert cardless installments
        assertEquals(1, paymentMethods.getCardlessInstallments().length);
        assertEquals("Mercado Pago", paymentMethods.getCardlessInstallments()[0].getName());
        assertEquals("https://http2.mlstatic.com/storage/logos-api-admin/f3e8e940-f549-11ef-bad6-e9962bcd76e5-m.svg", 
                paymentMethods.getCardlessInstallments()[0].getLogo());
        
        // Assert credit cards
        assertEquals(3, paymentMethods.getCreditCards().length);
        assertEquals("Visa", paymentMethods.getCreditCards()[0].getName());
        assertEquals("https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg", 
                paymentMethods.getCreditCards()[0].getLogo());
        assertEquals("Mastercard", paymentMethods.getCreditCards()[1].getName());
        assertEquals("American Express", paymentMethods.getCreditCards()[2].getName());
        
        // Assert debit cards
        assertEquals(2, paymentMethods.getDebitCards().length);
        assertEquals("Visa Débito", paymentMethods.getDebitCards()[0].getName());
        assertEquals("Mastercard Débito", paymentMethods.getDebitCards()[1].getName());
        
        // Assert more
        assertEquals("Ver más medios de pago", paymentMethods.getMore());
    }
    
    @Test
    public void testCardGettersAndSetters() {
        // Arrange
        ProductDetail.PaymentMethods.Card card = new ProductDetail.PaymentMethods.Card();
        
        // Act
        card.setName("Visa");
        card.setLogo("visa.png");
        
        // Assert
        assertEquals("Visa", card.getName());
        assertEquals("visa.png", card.getLogo());
    }
    
    @Test
    public void testCardlessInstallmentsGettersAndSetters() {
        // Arrange
        ProductDetail.PaymentMethods.CardlessInstallments cardless = new ProductDetail.PaymentMethods.CardlessInstallments();
        
        // Act
        cardless.setName("Mercado Pago");
        cardless.setLogo("mercadopago.png");
        
        // Assert
        assertEquals("Mercado Pago", cardless.getName());
        assertEquals("mercadopago.png", cardless.getLogo());
    }
}