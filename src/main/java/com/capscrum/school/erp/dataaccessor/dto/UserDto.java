package com.capscrum.school.erp.dataaccessor.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Safe projection of User entity — never exposes password hash.
 */
@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private String id;
    private String username;
    private String email;
    private String fullName;
    private boolean enabled;
    private Set<String> roles;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
