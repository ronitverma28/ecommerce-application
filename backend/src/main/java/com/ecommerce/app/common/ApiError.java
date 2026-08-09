package com.ecommerce.app.common;

import java.util.ArrayList;
import java.util.List;

public class ApiError {

    private boolean success = false;
    private String message;
    private List<String> errors;
    private long timestamp;

    public ApiError() {
        this.timestamp = System.currentTimeMillis();
        this.errors = new ArrayList<>();
    }

    public ApiError(String message) {
        this();
        this.message = message;
    }

    public ApiError(String message, List<String> errors) {
        this();
        this.message = message;
        this.errors = errors;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public List<String> getErrors() {
        return errors;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public void addError(String error) {
        this.errors.add(error);
    }
}
