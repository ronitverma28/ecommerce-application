package com.ecommerce.app.repository;

import com.ecommerce.app.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<Product> findByIsActiveTrue();

    @EntityGraph(attributePaths = { "category" })
    Optional<Product> findWithCategoryById(Long id);

    @EntityGraph(attributePaths = { "category" })
    List<Product> findByIsActiveTrueAndCategoryId(Long categoryId);

    @Query("""
        SELECT p
        FROM Product p
        WHERE p.isActive = true
          AND (
              :keyword IS NULL
              OR :keyword = ''
              OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
          )
          AND (
              :categoryId IS NULL
              OR p.category.id = :categoryId
          )
    """)
    Page<Product> searchActiveProducts(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.isActive = true ORDER BY p.createdAt DESC")
    Page<Product> findLatestProducts(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.price BETWEEN :minPrice AND :maxPrice")
    Page<Product> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.isActive = true AND p.category.id = :categoryId")
    long countByCategoryId(@Param("categoryId") Long categoryId);
}
