package com.challenge.api.infrastructure.gateway;

import com.challenge.api.dto.response.ProductDetail;
import com.challenge.api.exceptions.DataAccessException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class JsonFileReader {

    private final ObjectMapper objectMapper;
    private static final String productsJsonPath = "products.json";

    public JsonFileReader() {
        this.objectMapper = new ObjectMapper();
    }

    public List<ProductDetail> readAllProducts() {
        try {
            ClassPathResource resource = new ClassPathResource(productsJsonPath);
            InputStream inputStream = resource.getInputStream();
            return objectMapper.readValue(inputStream, new TypeReference<List<ProductDetail>>() {});
        } catch (IOException e) {
            log.error("Error reading products from JSON file", e);
            throw new DataAccessException("Error reading products from JSON file", e);
        }
    }

    public List<String> readStringListFromFile(String fileName) {
        try {
            ClassPathResource resource = new ClassPathResource(fileName);
            InputStream inputStream = resource.getInputStream();
            return objectMapper.readValue(inputStream, new TypeReference<List<String>>() {});
        } catch (IOException e) {
            log.error("Error reading string list from JSON file: " + fileName, e);
            throw new DataAccessException("Error reading string list from JSON file: " + fileName, e);
        }
    }
}
