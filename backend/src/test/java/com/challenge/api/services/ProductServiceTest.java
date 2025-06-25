package com.challenge.api.services;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.exceptions.ProductNotFoundException;
import com.challenge.api.infrastructure.ProductRepository;
import com.challenge.api.services.imp.ProductServicesImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServicesImp productService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearch_ReturnsAllProducts() {
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
        when(productRepository.getAllProducts()).thenReturn(expectedProducts);

        // Act
        List<Product> actualProducts = productService.search();

        // Assert
        assertEquals(expectedProducts, actualProducts);
        verify(productRepository, times(1)).getAllProducts();
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

        when(productRepository.getProductById(productId)).thenReturn(expectedProduct);

        // Act
        ProductDetail actualProduct = productService.getById(productId);

        // Assert
        assertEquals(expectedProduct, actualProduct);
        verify(productRepository, times(1)).getProductById(productId);
    }

    @Test
    public void testGetById_ProductNotFound_ThrowsException() {
        // Arrange
        String productId = "999";
        when(productRepository.getProductById(productId)).thenThrow(new ProductNotFoundException(productId));

        // Act & Assert
        assertThrows(ProductNotFoundException.class, () -> {
            productService.getById(productId);
        });
        verify(productRepository, times(1)).getProductById(productId);
    }
}