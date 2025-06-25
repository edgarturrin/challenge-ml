package com.challenge.api.exceptions;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;

public class DataAccessExceptionTest {

    @Test
    public void testDataAccessException() {
        // Arrange
        String message = "Error accessing data";
        Exception cause = new RuntimeException("Original error");
        
        // Act
        DataAccessException exception = new DataAccessException(message, cause);
        
        // Assert
        assertNotNull(exception);
        assertEquals(message, exception.getMessage());
        assertSame(cause, exception.getCause());
    }
}