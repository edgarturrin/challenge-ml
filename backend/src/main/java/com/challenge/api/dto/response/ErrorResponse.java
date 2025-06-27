package com.challenge.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorResponse {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now().toString();
    }

    @Builder
    public ErrorResponse(String timestamp, int status, String error, String message, String path) {
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now().toString();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}
