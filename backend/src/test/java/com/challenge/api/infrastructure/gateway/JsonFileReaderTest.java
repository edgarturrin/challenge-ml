package com.challenge.api.infrastructure.gateway;

import com.challenge.api.dto.response.ProductDetail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class JsonFileReaderTest {

    @Autowired
    private JsonFileReader jsonFileReader;

    @Test
    public void testReadAllProducts() {
        List<ProductDetail> products = jsonFileReader.readAllProducts();
        
        // Verify that products were loaded
        assertNotNull(products);
        assertFalse(products.isEmpty());
        
        // Verify that we have the expected number of products
        assertEquals(2, products.size());
        
        // Verify that the first product has the expected data
        ProductDetail firstProduct = products.get(0);
        assertEquals("MLA32427104", firstProduct.getId());
        assertEquals("Samsung Galaxy A15 128 GB Negro Azulado 4 GB RAM", firstProduct.getTitle());
        assertEquals(329999, firstProduct.getPrice());
    }

}