package com.ecommerce.app.service.order;

import com.ecommerce.app.dto.order.OrderRequest;
import com.ecommerce.app.dto.order.OrderResponse;
import com.ecommerce.app.model.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(Long userId, OrderRequest request);

    OrderResponse getOrderById(Long orderId, Long userId);

    OrderResponse getOrderById(Long orderId);

    Page<OrderResponse> getOrdersByUser(Long userId, Pageable pageable);

    OrderResponse updateOrderStatus(Long orderId, OrderStatus status);

    List<OrderResponse> getOrdersByStatus(OrderStatus status);

    Page<OrderResponse> getAllOrders(Pageable pageable);
}
