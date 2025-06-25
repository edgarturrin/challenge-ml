package com.challenge.api.controllers;

import com.challenge.api.dto.response.ApiResponse;
import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.exceptions.ProductNotFoundException;
import com.challenge.api.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductsControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductsController productsController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearch_ReturnsProductList() {
        // Arrange
        Product product1 = new Product();
        product1.setId("1");
        product1.setTitle("Product 1");
        product1.setPrice(100);
        product1.setImage("image1.jpg");

        Product product2 = new Product();
        product2.setId("2");
        product2.setTitle("Product 2");
        product2.setPrice(200);
        product2.setImage("image2.jpg");

        List<Product> expectedProducts = Arrays.asList(product1, product2);
        when(productService.search()).thenReturn(expectedProducts);

        // Act
        ResponseEntity<ApiResponse<List<Product>>> response = productsController.search();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK.value(), response.getBody().getStatus());
        assertEquals("Products retrieved successfully", response.getBody().getMessage());
        assertEquals(expectedProducts, response.getBody().getData());
        verify(productService, times(1)).search();
    }

    @Test
    public void testGetById_ReturnsProductDetail() {
        // Arrange
        String productId = "1";
        ProductDetail expectedProduct = new ProductDetail();
        expectedProduct.setId(productId);
        expectedProduct.setTitle("Product 1");
        expectedProduct.setPrice(100);
        expectedProduct.setPreferredImage("image1.jpg");

        when(productService.getById(productId)).thenReturn(expectedProduct);

        // Act
        ResponseEntity<ApiResponse<ProductDetail>> response = productsController.getById(productId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK.value(), response.getBody().getStatus());
        assertEquals("Product details retrieved successfully", response.getBody().getMessage());
        assertEquals(expectedProduct, response.getBody().getData());
        verify(productService, times(1)).getById(productId);
    }

    @Test
    public void testGetById_ProductNotFound_ThrowsException() {
        // Arrange
        String productId = "999";
        when(productService.getById(productId)).thenThrow(new ProductNotFoundException(productId));

        // Act & Assert
        assertThrows(ProductNotFoundException.class, () -> {
            productsController.getById(productId);
        });
        verify(productService, times(1)).getById(productId);
    }
}