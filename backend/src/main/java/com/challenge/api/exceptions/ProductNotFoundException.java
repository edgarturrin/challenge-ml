package com.challenge.api.exceptions;


public class ProductNotFoundException extends RuntimeException {
    
    public ProductNotFoundException(String id) {
        super("Product not found with id: " + id);
    }
}