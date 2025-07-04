package com.challenge.api.services;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;

import java.util.List;

public interface ProductService {
    List<Product> search(String search);
    ProductDetail getById(String id);
}
