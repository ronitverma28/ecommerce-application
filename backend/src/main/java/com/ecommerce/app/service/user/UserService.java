package com.ecommerce.app.service.user;

import com.ecommerce.app.dto.user.UserResponse;
import com.ecommerce.app.dto.user.UserUpdateRequest;
import com.ecommerce.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserResponse getUserById(Long id);

    UserResponse updateProfile(Long id, UserUpdateRequest request);

    UserResponse getCurrentUserProfile(Long id);

    Page<UserResponse> getAllUsers(Pageable pageable);

    void deleteUser(Long id);

    User findByEmail(String email);
}
