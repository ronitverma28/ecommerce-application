package com.ecommerce.app.controller.payment;

import com.ecommerce.app.common.ApiResponse;
import com.ecommerce.app.dto.payment.PaymentResponse;
import com.ecommerce.app.security.CustomUserDetails;
import com.ecommerce.app.service.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/process/{orderId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> processPayment(
            Authentication authentication,
            @PathVariable Long orderId,
            @RequestParam String paymentMethod) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        PaymentResponse payment = paymentService.processPayment(orderId, paymentMethod);
        return ResponseEntity.ok(ApiResponse.success(payment, "Payment processed successfully"));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentByOrderId(
            Authentication authentication,
            @PathVariable Long orderId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        PaymentResponse payment = paymentService.getPaymentByOrderId(orderId);
        return ResponseEntity.ok(ApiResponse.success(payment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentById(
            Authentication authentication,
            @PathVariable Long id) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        PaymentResponse payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(ApiResponse.success(payment));
    }

    @PostMapping("/refund/{orderId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> refundPayment(
            Authentication authentication,
            @PathVariable Long orderId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        PaymentResponse payment = paymentService.processRefund(orderId);
        return ResponseEntity.ok(ApiResponse.success(payment, "Payment refunded successfully"));
    }
}
