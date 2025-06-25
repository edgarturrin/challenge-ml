package com.challenge.api.services.imp;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.infrastructure.ProductRepository;
import com.challenge.api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServicesImp implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServicesImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> search() {
        return productRepository.getAllProducts();
    }

    @Override
    public ProductDetail getById(String id) {
        return productRepository.getProductById(id);
    }
}
