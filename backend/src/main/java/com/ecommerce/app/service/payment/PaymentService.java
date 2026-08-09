package com.ecommerce.app.service.payment;

import com.ecommerce.app.dto.payment.PaymentResponse;

public interface PaymentService {

    PaymentResponse processPayment(Long orderId, String paymentMethod);

    PaymentResponse getPaymentByOrderId(Long orderId);

    PaymentResponse getPaymentById(Long paymentId);

    PaymentResponse processRefund(Long orderId);
}
