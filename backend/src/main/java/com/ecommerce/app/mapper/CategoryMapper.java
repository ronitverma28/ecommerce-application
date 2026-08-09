package com.ecommerce.app.mapper;

import com.ecommerce.app.dto.category.CategoryResponse;
import com.ecommerce.app.model.Category;
import java.util.Collections;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category) {
        if (category == null) {
            return null;
        }

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .parentId(category.getParent() != null ? category.getParent().getId() : null)
                .children(category.getChildren() != null
                        ? category.getChildren().stream()
                                .map(CategoryMapper::toResponse)
                                .collect(Collectors.toList())
                        : Collections.emptyList())
                .isActive(category.getIsActive())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}
