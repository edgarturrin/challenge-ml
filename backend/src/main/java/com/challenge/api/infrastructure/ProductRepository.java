package com.challenge.api.infrastructure;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;

import java.util.List;

public interface ProductRepository {
    List<Product> getAllProducts();
    ProductDetail getProductById(String id);
}
