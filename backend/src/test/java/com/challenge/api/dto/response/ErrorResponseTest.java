package com.challenge.api.dto.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ErrorResponseTest {

    @Test
    public void testErrorResponseBuilder() {
        // Arrange & Act
        ErrorResponse response = ErrorResponse.builder()
                .status(404)
                .error("Not Found")
                .message("Resource not found")
                .path("/api/resource")
                .build();

        // Assert
        assertEquals(404, response.getStatus());
        assertEquals("Not Found", response.getError());
        assertEquals("Resource not found", response.getMessage());
        assertEquals("/api/resource", response.getPath());
        assertNotNull(response.getTimestamp());
    }

    @Test
    public void testErrorResponseGettersAndSetters() {
        // Arrange
        ErrorResponse response = ErrorResponse.builder()
                .status(500)
                .error("Error")
                .message("Message")
                .path("/path")
                .build();

        String timestamp = "2023-01-01T12:00:00";

        // Act
        response.setStatus(400);
        response.setError("Bad Request");
        response.setMessage("Invalid input");
        response.setPath("/api/input");
        response.setTimestamp(timestamp);

        // Assert
        assertEquals(400, response.getStatus());
        assertEquals("Bad Request", response.getError());
        assertEquals("Invalid input", response.getMessage());
        assertEquals("/api/input", response.getPath());
        assertEquals(timestamp, response.getTimestamp());
    }

    @Test
    public void testErrorResponseEqualsAndHashCode() {
        // Arrange
        String timestamp = "2023-01-01T12:00:00";

        ErrorResponse response1 = ErrorResponse.builder()
                .status(404)
                .error("Not Found")
                .message("Resource not found")
                .path("/api/resource")
                .build();
        response1.setTimestamp(timestamp);

        ErrorResponse response2 = ErrorResponse.builder()
                .status(404)
                .error("Not Found")
                .message("Resource not found")
                .path("/api/resource")
                .build();
        response2.setTimestamp(timestamp);

        ErrorResponse response3 = ErrorResponse.builder()
                .status(500)
                .error("Server Error")
                .message("Internal error")
                .path("/api/resource")
                .build();
        response3.setTimestamp(timestamp);

        // Assert
        assertEquals(response1, response2);
        assertEquals(response1.hashCode(), response2.hashCode());

        assertNotEquals(response1, response3);
        assertNotEquals(response1.hashCode(), response3.hashCode());
    }

    @Test
    public void testErrorResponseToString() {
        // Arrange
        ErrorResponse response = ErrorResponse.builder()
                .status(404)
                .error("Not Found")
                .message("Resource not found")
                .path("/api/resource")
                .build();

        // Act
        String toString = response.toString();

        // Assert
        assertTrue(toString.contains("status=404"));
        assertTrue(toString.contains("error=Not Found"));
        assertTrue(toString.contains("message=Resource not found"));
        assertTrue(toString.contains("path=/api/resource"));
        assertTrue(toString.contains("timestamp="));
    }
}
