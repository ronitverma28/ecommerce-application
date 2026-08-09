package com.ecommerce.app.service.category;

import com.ecommerce.app.dto.category.CategoryRequest;
import com.ecommerce.app.dto.category.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    CategoryResponse getCategoryById(Long id);

    CategoryResponse getCategoryBySlug(String slug);

    CategoryResponse createCategory(CategoryRequest request);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);

    List<CategoryResponse> getAllActiveCategories();

    Page<CategoryResponse> searchCategories(String keyword, Pageable pageable);
}
