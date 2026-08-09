package com.ecommerce.app.service.auth;

import com.ecommerce.app.dto.auth.ChangePasswordRequest;
import com.ecommerce.app.dto.auth.JwtResponse;
import com.ecommerce.app.dto.auth.LoginRequest;
import com.ecommerce.app.dto.auth.RegisterRequest;
import org.springframework.security.core.Authentication;

public interface AuthService {

    JwtResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

    Authentication authenticate(LoginRequest request);

    void changePassword(Long userId, ChangePasswordRequest changePasswordRequest);
}
