package com.challenge.api.infrastructure;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.exceptions.ProductNotFoundException;
import com.challenge.api.infrastructure.gateway.JsonFileReader;
import com.challenge.api.infrastructure.imp.ProductRepositoryImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductRepositoryTest {

    @Mock
    private JsonFileReader jsonFileReader;

    @InjectMocks
    private ProductRepositoryImp productRepository;

    private ProductDetail product1;
    private ProductDetail product2;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        // Setup test data
        product1 = new ProductDetail();
        product1.setId("1");
        product1.setTitle("Product 1");
        product1.setPrice(100);
        product1.setPreferredImage("image1.jpg");

        product2 = new ProductDetail();
        product2.setId("2");
        product2.setTitle("Product 2");
        product2.setPrice(200);
        product2.setPreferredImage("image2.jpg");
    }

    @Test
    public void testGetAllProducts_ReturnsConvertedProducts() {
        // Arrange
        List<ProductDetail> productDetails = Arrays.asList(product1, product2);
        when(jsonFileReader.readAllProducts()).thenReturn(productDetails);

        // Act
        List<Product> products = productRepository.getAllProducts();

        // Assert
        assertEquals(2, products.size());
        
        // Verify first product
        Product firstProduct = products.get(0);
        assertEquals("1", firstProduct.getId());
        assertEquals("Product 1", firstProduct.getTitle());
        assertEquals(100, firstProduct.getPrice());
        assertEquals("image1.jpg", firstProduct.getImage());
        
        // Verify second product
        Product secondProduct = products.get(1);
        assertEquals("2", secondProduct.getId());
        assertEquals("Product 2", secondProduct.getTitle());
        assertEquals(200, secondProduct.getPrice());
        assertEquals("image2.jpg", secondProduct.getImage());
        
        verify(jsonFileReader, times(1)).readAllProducts();
    }

    @Test
    public void testGetProductById_ReturnsProduct() {
        // Arrange
        List<ProductDetail> productDetails = Arrays.asList(product1, product2);
        when(jsonFileReader.readAllProducts()).thenReturn(productDetails);

        // Act
        ProductDetail result = productRepository.getProductById("1");

        // Assert
        assertNotNull(result);
        assertEquals("1", result.getId());
        assertEquals("Product 1", result.getTitle());
        assertEquals(100, result.getPrice());
        assertEquals("image1.jpg", result.getPreferredImage());
        verify(jsonFileReader, times(1)).readAllProducts();
    }

    @Test
    public void testGetProductById_ProductNotFound_ThrowsException() {
        // Arrange
        List<ProductDetail> productDetails = Arrays.asList(product1, product2);
        when(jsonFileReader.readAllProducts()).thenReturn(productDetails);

        // Act & Assert
        ProductNotFoundException exception = assertThrows(ProductNotFoundException.class, () -> {
            productRepository.getProductById("999");
        });
        
        assertEquals("Product not found with id: 999", exception.getMessage());
        verify(jsonFileReader, times(1)).readAllProducts();
    }
}