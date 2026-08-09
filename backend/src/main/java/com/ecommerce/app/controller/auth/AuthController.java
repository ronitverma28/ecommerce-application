package com.ecommerce.app.controller.auth;

import com.ecommerce.app.common.ApiResponse;
import com.ecommerce.app.dto.auth.ChangePasswordRequest;
import com.ecommerce.app.dto.auth.JwtResponse;
import com.ecommerce.app.dto.auth.LoginRequest;
import com.ecommerce.app.dto.auth.RegisterRequest;
import com.ecommerce.app.security.CustomUserDetails;
import com.ecommerce.app.service.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<JwtResponse>> register(@Valid @RequestBody RegisterRequest request) {
        JwtResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> login(@Valid @RequestBody LoginRequest request) {
        JwtResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(Authentication authentication,  @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        authService.changePassword(customUserDetails.getId(), changePasswordRequest);
        return ResponseEntity.ok(ApiResponse.success(null, "Password changed successfully"));
    }
}
