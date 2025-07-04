package com.challenge.api.controllers;

import com.challenge.api.exceptions.ProductNotFoundException;
import com.challenge.api.services.BlacklistService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

@Component
public class BlacklistInterceptor implements HandlerInterceptor {
    private final BlacklistService blacklistService;

    public BlacklistInterceptor(BlacklistService blacklistService) {
        this.blacklistService = blacklistService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        if (uri.equals("/products/search")) {
            String search = request.getParameter("search");
            if (search != null && blacklistService.getBlacklist().contains(search.trim().toLowerCase())) {
                throw new ProductNotFoundException("Palabra reservada: " + search, true);
            }
        }
        return true;
    }
} 