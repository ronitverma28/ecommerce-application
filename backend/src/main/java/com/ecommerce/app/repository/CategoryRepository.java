package com.ecommerce.app.repository;

import com.ecommerce.app.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<Category> findByIsActiveTrue();

    List<Category> findByParentIsNullAndIsActiveTrue();

    List<Category> findByParentIdAndIsActiveTrue(Long parentId);

    @EntityGraph(attributePaths = {"parent"})
    Optional<Category> findWithParentById(Long id);

    @Query("SELECT c FROM Category c WHERE c.isActive = true AND (c.name LIKE %:keyword% OR c.description LIKE %:keyword%)")
    Page<Category> searchActiveCategories(@Param("keyword") String keyword, Pageable pageable);
}
