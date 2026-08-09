package com.ecommerce.app.controller.cart;

import com.ecommerce.app.common.ApiResponse;
import com.ecommerce.app.dto.cart.CartItemRequest;
import com.ecommerce.app.dto.cart.CartItemResponse;
import com.ecommerce.app.dto.cart.CartResponse;
import com.ecommerce.app.security.CustomUserDetails;
import com.ecommerce.app.service.cart.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        CartResponse cart = cartService.getCartResponse(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartItemResponse>> addToCart(
            Authentication authentication,
            @Valid @RequestBody CartItemRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        CartItemResponse item = cartService.addToCart(userDetails.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(item, "Item added to cart"));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartItemResponse>> updateCartItemQuantity(
            Authentication authentication,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        CartItemResponse item = cartService.updateCartItemQuantity(userDetails.getId(), itemId, quantity);
        return ResponseEntity.ok(ApiResponse.success(item, "Cart item updated"));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<Void>> removeFromCart(Authentication authentication, @PathVariable Long itemId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        cartService.removeFromCart(userDetails.getId(), itemId);
        return ResponseEntity.ok(ApiResponse.success(null, "Item removed from cart"));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        cartService.clearCart(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success(null, "Cart cleared"));
    }
}
