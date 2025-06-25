package com.challenge.api.infrastructure.imp;

import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.exceptions.ProductNotFoundException;
import com.challenge.api.infrastructure.ProductRepository;
import com.challenge.api.infrastructure.gateway.JsonFileReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProductRepositoryImp implements ProductRepository {

    private final JsonFileReader jsonFileReader;

    @Autowired
    public ProductRepositoryImp(JsonFileReader jsonFileReader) {
        this.jsonFileReader = jsonFileReader;
    }

    @Override
    public List<Product> getAllProducts() {
        return jsonFileReader.readAllProducts().stream()
                .map(this::convertToProduct)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDetail getProductById(String id) {
        ProductDetail detail = jsonFileReader.readAllProducts().stream()
                .filter(product -> product.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (detail == null) {
            throw new ProductNotFoundException(id);
        }

        return detail;
    }

    private Product convertToProduct(ProductDetail detail) {
        Product product = new Product();
        product.setId(detail.getId());
        product.setTitle(detail.getTitle());
        product.setPrice(detail.getPrice());
        product.setImage(detail.getPreferredImage());
        return product;
    }
}
