package com.challenge.api.dto.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ApiResponseTest {

    @Test
    public void testApiResponseBuilder() {
        // Arrange & Act
        ApiResponse<String> response = ApiResponse.<String>builder()
                .status(200)
                .message("Success")
                .data("Test data")
                .build();

        // Assert
        assertEquals(200, response.getStatus());
        assertEquals("Success", response.getMessage());
        assertEquals("Test data", response.getData());
    }

    @Test
    public void testApiResponseGettersAndSetters() {
        // Arrange
        ApiResponse<Integer> response = ApiResponse.<Integer>builder()
                .status(200)
                .message("Initial")
                .data(0)
                .build();

        // Act
        response.setStatus(201);
        response.setMessage("Created");
        response.setData(42);

        // Assert
        assertEquals(201, response.getStatus());
        assertEquals("Created", response.getMessage());
        assertEquals(42, response.getData());
    }

    @Test
    public void testApiResponseEqualsAndHashCode() {
        // Arrange
        ApiResponse<String> response1 = ApiResponse.<String>builder()
                .status(200)
                .message("Success")
                .data("Test data")
                .build();

        ApiResponse<String> response2 = ApiResponse.<String>builder()
                .status(200)
                .message("Success")
                .data("Test data")
                .build();

        ApiResponse<String> response3 = ApiResponse.<String>builder()
                .status(404)
                .message("Not Found")
                .data(null)
                .build();

        // Assert
        assertEquals(response1, response2);
        assertEquals(response1.hashCode(), response2.hashCode());

        assertNotEquals(response1, response3);
        assertNotEquals(response1.hashCode(), response3.hashCode());
    }

    @Test
    public void testApiResponseToString() {
        // Arrange
        ApiResponse<String> response = ApiResponse.<String>builder()
                .status(200)
                .message("Success")
                .data("Test data")
                .build();

        // Act
        String toString = response.toString();

        // Assert
        assertTrue(toString.contains("status=200"));
        assertTrue(toString.contains("message=Success"));
        assertTrue(toString.contains("data=Test data"));
    }
}
