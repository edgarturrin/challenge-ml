package com.challenge.api.dto.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ProductTest {

    @Test
    public void testProductGettersAndSetters() {
        // Arrange
        Product product = new Product();
        
        // Act
        product.setId("1");
        product.setTitle("Test Product");
        product.setPrice(100);
        product.setImage("test.jpg");
        
        // Assert
        assertEquals("1", product.getId());
        assertEquals("Test Product", product.getTitle());
        assertEquals(100, product.getPrice());
        assertEquals("test.jpg", product.getImage());
    }
    
    @Test
    public void testProductEqualsAndHashCode() {
        // Arrange
        Product product1 = new Product();
        product1.setId("1");
        product1.setTitle("Test Product");
        product1.setPrice(100);
        product1.setImage("test.jpg");
        
        Product product2 = new Product();
        product2.setId("1");
        product2.setTitle("Test Product");
        product2.setPrice(100);
        product2.setImage("test.jpg");
        
        Product product3 = new Product();
        product3.setId("2");
        product3.setTitle("Different Product");
        product3.setPrice(200);
        product3.setImage("different.jpg");
        
        // Assert
        assertEquals(product1, product2);
        assertEquals(product1.hashCode(), product2.hashCode());
        
        assertNotEquals(product1, product3);
        assertNotEquals(product1.hashCode(), product3.hashCode());
    }
    
    @Test
    public void testProductToString() {
        // Arrange
        Product product = new Product();
        product.setId("1");
        product.setTitle("Test Product");
        product.setPrice(100);
        product.setImage("test.jpg");
        
        // Act
        String toString = product.toString();
        
        // Assert
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("title=Test Product"));
        assertTrue(toString.contains("price=100"));
        assertTrue(toString.contains("image=test.jpg"));
    }
}