package com.ecommerce.app.service.product;

import com.ecommerce.app.dto.product.ProductRequest;
import com.ecommerce.app.dto.product.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    ProductResponse getProductById(Long id);

    ProductResponse getProductBySlug(String slug);

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);

    Page<ProductResponse> getAllProducts(Pageable pageable);

    Page<ProductResponse> searchProducts(String keyword, Long categoryId, Pageable pageable);

    List<ProductResponse> getProductsByCategory(Long categoryId);

    Page<ProductResponse> getLatestProducts(Pageable pageable);

    Page<ProductResponse> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
}
