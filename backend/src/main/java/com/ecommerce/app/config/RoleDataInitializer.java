package com.ecommerce.app.config;

import com.ecommerce.app.model.Role;
import com.ecommerce.app.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleDataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            roleRepository.save(Role.builder()
                    .name("ROLE_USER")
                    .description("Default user role")
                    .build());
        }

        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepository.save(Role.builder()
                    .name("ROLE_ADMIN")
                    .description("Administrator role")
                    .build());
        }
    }
}
