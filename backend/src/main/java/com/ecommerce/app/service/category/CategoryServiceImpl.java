package com.ecommerce.app.service.category;

import com.ecommerce.app.dto.category.CategoryRequest;
import com.ecommerce.app.dto.category.CategoryResponse;
import com.ecommerce.app.mapper.CategoryMapper;
import com.ecommerce.app.model.Category;
import com.ecommerce.app.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        CategoryResponse response = CategoryMapper.toResponse(category);
        populateChildren(category, response);
        return response;
    }

    @Override
    public CategoryResponse getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Category not found with slug: " + slug));
        CategoryResponse response = CategoryMapper.toResponse(category);
        populateChildren(category, response);
        return response;
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Category with slug '" + request.getSlug() + "' already exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .isActive(request.getIsActive() == null || request.getIsActive())
                .build();

        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.getParentId()));
            category.setParent(parent);
        }

        Category savedCategory = categoryRepository.save(category);
        CategoryResponse response = CategoryMapper.toResponse(savedCategory);
        response.setChildren(new ArrayList<>());
        return response;
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        if (request.getSlug() != null && !request.getSlug().equals(category.getSlug())
                && categoryRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Category with slug '" + request.getSlug() + "' already exists");
        }

        category.setName(request.getName());
        category.setSlug(request.getSlug());
        category.setDescription(request.getDescription());

        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }

        if (request.getParentId() != null) {
            if (request.getParentId().equals(id)) {
                throw new RuntimeException("A category cannot be its own parent");
            }
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found with id: " + request.getParentId()));
            category.setParent(parent);
        } else {
            category.setParent(null);
        }

        Category updatedCategory = categoryRepository.save(category);
        CategoryResponse response = CategoryMapper.toResponse(updatedCategory);
        populateChildren(updatedCategory, response);
        return response;
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        categoryRepository.delete(category);
    }

    @Override
    public List<CategoryResponse> getAllActiveCategories() {
        List<Category> categories = categoryRepository.findByIsActiveTrue();
        List<Category> rootCategories = categories.stream()
                .filter(c -> c.getParent() == null)
                .collect(Collectors.toList());

        return rootCategories.stream()
                .map(category -> {
                    CategoryResponse response = CategoryMapper.toResponse(category);
                    populateChildren(category, response);
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryResponse> searchCategories(String keyword, Pageable pageable) {
        Page<Category> page = categoryRepository.searchActiveCategories(keyword, pageable);
        List<CategoryResponse> responses = page.getContent().stream()
                .map(CategoryMapper::toResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(responses, pageable, page.getTotalElements());
    }

    private void populateChildren(Category category, CategoryResponse response) {
        List<CategoryResponse> children = category.getChildren().stream()
                .map(CategoryMapper::toResponse)
                .collect(Collectors.toList());
        response.setChildren(children);
    }
}
