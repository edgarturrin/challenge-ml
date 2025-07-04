package com.challenge.api.services.imp;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.infrastructure.ProductRepository;
import com.challenge.api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServicesImp implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServicesImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> search(String search) {
        List<Product> allProducts = productRepository.getAllProducts();
        if (search == null || search.trim().isEmpty()) {
            return allProducts;
        }
        String searchLower = search.toLowerCase();
        return allProducts.stream()
                .filter(p -> p.getTitle() != null && p.getTitle().toLowerCase().contains(searchLower))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDetail getById(String id) {
        return productRepository.getProductById(id);
    }
}
