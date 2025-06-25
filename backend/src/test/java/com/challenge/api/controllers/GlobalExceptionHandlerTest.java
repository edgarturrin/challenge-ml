package com.challenge.api.controllers;

import com.challenge.api.dto.response.ErrorResponse;
import com.challenge.api.exceptions.DataAccessException;
import com.challenge.api.exceptions.ProductNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

public class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler exceptionHandler;

    @Mock
    private WebRequest webRequest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(webRequest.getDescription(false)).thenReturn("uri=/test/path");
    }

    @Test
    public void testHandleProductNotFoundException() {
        // Arrange
        String productId = "999";
        ProductNotFoundException exception = new ProductNotFoundException(productId);

        // Act
        ResponseEntity<ErrorResponse> response = exceptionHandler.handleProductNotFoundException(exception, webRequest);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.getStatus());
        assertEquals("Not Found", errorResponse.getError());
        assertEquals("Product not found with id: " + productId, errorResponse.getMessage());
        assertEquals("/test/path", errorResponse.getPath());
    }

    @Test
    public void testHandleDataAccessException() {
        // Arrange
        String message = "Error accessing data";
        DataAccessException exception = new DataAccessException(message, new RuntimeException());

        // Act
        ResponseEntity<ErrorResponse> response = exceptionHandler.handleDataAccessException(exception, webRequest);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorResponse.getStatus());
        assertEquals("Internal Server Error", errorResponse.getError());
        assertEquals(message, errorResponse.getMessage());
        assertEquals("/test/path", errorResponse.getPath());
    }

    @Test
    public void testHandleNoHandlerFoundException() {
        // Arrange
        NoHandlerFoundException exception = new NoHandlerFoundException("GET", "/invalid/path", null);

        // Act
        ResponseEntity<ErrorResponse> response = exceptionHandler.handleNoHandlerFoundException(exception, webRequest);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.getStatus());
        assertEquals("Not Found", errorResponse.getError());
        assertEquals("No handler found for GET /invalid/path", errorResponse.getMessage());
        assertEquals("/test/path", errorResponse.getPath());
    }

    @Test
    public void testHandleGlobalException() {
        // Arrange
        Exception exception = new RuntimeException("Unexpected error");

        // Act
        ResponseEntity<ErrorResponse> response = exceptionHandler.handleGlobalException(exception, webRequest);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        ErrorResponse errorResponse = response.getBody();
        assertNotNull(errorResponse);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorResponse.getStatus());
        assertEquals("Internal Server Error", errorResponse.getError());
        assertEquals("An unexpected error occurred", errorResponse.getMessage());
        assertEquals("/test/path", errorResponse.getPath());
    }
}