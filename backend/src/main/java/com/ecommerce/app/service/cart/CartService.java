package com.ecommerce.app.service.cart;

import com.ecommerce.app.dto.cart.CartItemRequest;
import com.ecommerce.app.dto.cart.CartItemResponse;
import com.ecommerce.app.dto.cart.CartResponse;

public interface CartService {

    CartResponse getCartResponse(Long userId);

    CartItemResponse addToCart(Long userId, CartItemRequest request);

    CartItemResponse updateCartItemQuantity(Long userId, Long cartItemId, int quantity);

    void removeFromCart(Long userId, Long cartItemId);

    void clearCart(Long userId);
}
