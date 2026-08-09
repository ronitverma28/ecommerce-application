package com.ecommerce.app.repository;

import com.ecommerce.app.model.Payment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrderId(Long orderId);

    Optional<Payment> findByTransactionId(String transactionId);

    @EntityGraph(attributePaths = {"order"})
    Optional<Payment> findWithOrderById(Long id);

    @EntityGraph(attributePaths = {"order", "order.user", "order.items"})
    Optional<Payment> findWithOrderAndItemsById(Long id);
}
