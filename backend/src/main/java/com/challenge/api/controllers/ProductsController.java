package com.challenge.api.controllers;

import com.challenge.api.dto.response.ApiResponse;
import com.challenge.api.dto.response.Product;
import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductsController {

    private final ProductService productService;

    @Autowired
    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Product>>> search() {
        List<Product> products = productService.search();
        return ResponseEntity.ok(ApiResponse.<List<Product>>builder()
                .status(HttpStatus.OK.value())
                .message("Products retrieved successfully")
                .data(products)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDetail>> getById(@PathVariable String id) {
        ProductDetail product = productService.getById(id);
        return ResponseEntity.ok(ApiResponse.<ProductDetail>builder()
                .status(HttpStatus.OK.value())
                .message("Product details retrieved successfully")
                .data(product)
                .build());
    }
} 
