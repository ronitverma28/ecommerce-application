package com.ecommerce.app.mapper;

import com.ecommerce.app.dto.cart.CartItemResponse;
import com.ecommerce.app.dto.cart.CartResponse;
import com.ecommerce.app.model.Cart;
import com.ecommerce.app.model.CartItem;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.stream.Collectors;

public class CartMapper {

    public static CartResponse toResponse(Cart cart) {
        if (cart == null) {
            return null;
        }

        BigDecimal totalPrice = cart.getItems() == null
                ? BigDecimal.ZERO
                : cart.getItems().stream()
                        .map(item -> item.getPriceAtAdd().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = cart.getItems() == null
                ? 0
                : cart.getItems().stream()
                        .mapToInt(CartItem::getQuantity)
                        .sum();

        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUser() != null ? cart.getUser().getId() : null)
                .items(cart.getItems() != null
                        ? cart.getItems().stream()
                                .map(CartMapper::toItemResponse)
                                .collect(Collectors.toList())
                        : Collections.emptyList())
                .totalPrice(totalPrice)
                .totalItems(totalItems)
                .build();
    }

    public static CartItemResponse toItemResponse(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }

        return CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct() != null ? cartItem.getProduct().getId() : null)
                .productName(cartItem.getProduct() != null ? cartItem.getProduct().getName() : null)
                .priceAtAdd(cartItem.getPriceAtAdd())
                .quantity(cartItem.getQuantity())
                .totalPrice(cartItem.getPriceAtAdd().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                .build();
    }
}
