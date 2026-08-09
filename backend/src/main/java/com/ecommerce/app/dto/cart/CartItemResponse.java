package com.ecommerce.app.dto.cart;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CartItemResponse {

    private Long id;
    private Long productId;
    private String productName;
    private BigDecimal priceAtAdd;
    private int quantity;
    private BigDecimal totalPrice;
}
