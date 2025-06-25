package com.challenge.api.exceptions;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ProductNotFoundExceptionTest {

    @Test
    public void testProductNotFoundException() {
        // Arrange
        String productId = "123";
        
        // Act
        ProductNotFoundException exception = new ProductNotFoundException(productId);
        
        // Assert
        assertNotNull(exception);
        assertEquals("Product not found with id: " + productId, exception.getMessage());
    }
}