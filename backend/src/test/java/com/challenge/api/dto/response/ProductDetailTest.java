package com.challenge.api.dto.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ProductDetailTest {

    @Test
    public void testProductDetailGettersAndSetters() {
        // Arrange
        ProductDetail productDetail = new ProductDetail();

        // Act
        productDetail.setId("1");
        productDetail.setTitle("Test Product");
        productDetail.setPrice(100);
        productDetail.setDiscount(10);
        productDetail.setInstallments("12x $10");
        productDetail.setStock(50);
        productDetail.setPreferredImage("main.jpg");
        productDetail.setImages(new String[]{"image1.jpg", "image2.jpg"});
        productDetail.setColor("Red");
        productDetail.setMemory("64 GB");
        productDetail.setDescription("Test description");

        // Create and set features
        ProductDetail.Feature feature1 = new ProductDetail.Feature();
        feature1.setLabel("Feature 1");
        feature1.setValue("Value 1");

        ProductDetail.Feature feature2 = new ProductDetail.Feature();
        feature2.setLabel("Feature 2");
        feature2.setValue("Value 2");

        productDetail.setFeatures(new ProductDetail.Feature[]{feature1, feature2});

        // Create and set payment methods
        ProductDetail.PaymentMethods paymentMethods = new ProductDetail.PaymentMethods();
        paymentMethods.setInstallmentsBold("12 cuotas");

        ProductDetail.PaymentMethods.CardlessInstallments cardless1 = new ProductDetail.PaymentMethods.CardlessInstallments();
        cardless1.setName("Mercado Pago");
        cardless1.setLogo("mercadopago.png");

        paymentMethods.setCardlessInstallments(new ProductDetail.PaymentMethods.CardlessInstallments[]{cardless1});

        ProductDetail.PaymentMethods.Card creditCard1 = new ProductDetail.PaymentMethods.Card();
        creditCard1.setName("Visa");
        creditCard1.setLogo("visa.png");

        ProductDetail.PaymentMethods.Card creditCard2 = new ProductDetail.PaymentMethods.Card();
        creditCard2.setName("Mastercard");
        creditCard2.setLogo("mastercard.png");

        paymentMethods.setCreditCards(new ProductDetail.PaymentMethods.Card[]{creditCard1, creditCard2});

        ProductDetail.PaymentMethods.Card debitCard1 = new ProductDetail.PaymentMethods.Card();
        debitCard1.setName("Visa Débito");
        debitCard1.setLogo("visa_debito.png");

        paymentMethods.setDebitCards(new ProductDetail.PaymentMethods.Card[]{debitCard1});

        paymentMethods.setMore("Ver más medios de pago");

        productDetail.setPaymentMethods(paymentMethods);

        // Assert basic fields
        assertEquals("1", productDetail.getId());
        assertEquals("Test Product", productDetail.getTitle());
        assertEquals(100, productDetail.getPrice());
        assertEquals(10, productDetail.getDiscount());
        assertEquals("12x $10", productDetail.getInstallments());
        assertEquals(50, productDetail.getStock());
        assertEquals("main.jpg", productDetail.getPreferredImage());
        assertArrayEquals(new String[]{"image1.jpg", "image2.jpg"}, productDetail.getImages());
        assertEquals("Red", productDetail.getColor());
        assertEquals("64 GB", productDetail.getMemory());
        assertEquals("Test description", productDetail.getDescription());

        // Assert features
        assertEquals(2, productDetail.getFeatures().length);
        assertEquals("Feature 1", productDetail.getFeatures()[0].getLabel());
        assertEquals("Value 1", productDetail.getFeatures()[0].getValue());
        assertEquals("Feature 2", productDetail.getFeatures()[1].getLabel());
        assertEquals("Value 2", productDetail.getFeatures()[1].getValue());

        // Assert payment methods
        assertEquals("12 cuotas", productDetail.getPaymentMethods().getInstallmentsBold());
        assertEquals(1, productDetail.getPaymentMethods().getCardlessInstallments().length);
        assertEquals("Visa", productDetail.getPaymentMethods().getCreditCards()[0].getName());
        assertEquals("visa.png", productDetail.getPaymentMethods().getCreditCards()[0].getLogo());
        assertEquals("Mastercard", productDetail.getPaymentMethods().getCreditCards()[1].getName());
        assertEquals("mastercard.png", productDetail.getPaymentMethods().getCreditCards()[1].getLogo());
    }

    @Test
    public void testFeatureGettersAndSetters() {
        // Arrange
        ProductDetail.Feature feature = new ProductDetail.Feature();

        // Act
        feature.setLabel("Test Label");
        feature.setValue("Test Value");

        // Assert
        assertEquals("Test Label", feature.getLabel());
        assertEquals("Test Value", feature.getValue());
    }

    @Test
    public void testPaymentMethodsGettersAndSetters() {
        // Arrange
        ProductDetail.PaymentMethods paymentMethods = new ProductDetail.PaymentMethods();

        // Act
        paymentMethods.setInstallmentsBold("12 cuotas");

        ProductDetail.PaymentMethods.CardlessInstallments card = new ProductDetail.PaymentMethods.CardlessInstallments();
        card.setName("Visa");
        card.setLogo("visa.png");

        paymentMethods.setCardlessInstallments(new ProductDetail.PaymentMethods.CardlessInstallments[]{card});

        // Assert
        assertEquals("12 cuotas", paymentMethods.getInstallmentsBold());
        assertEquals(1, paymentMethods.getCardlessInstallments().length);
        assertEquals("Visa", paymentMethods.getCardlessInstallments()[0].getName());
        assertEquals("visa.png", paymentMethods.getCardlessInstallments()[0].getLogo());
    }

    @Test
    public void testSinTarjetaGettersAndSetters() {
        // Arrange
        ProductDetail.PaymentMethods.CardlessInstallments card = new ProductDetail.PaymentMethods.CardlessInstallments();

        // Act
        card.setName("Visa");
        card.setLogo("visa.png");

        // Assert
        assertEquals("Visa", card.getName());
        assertEquals("visa.png", card.getLogo());
    }
}
