package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.dto.UserDto;
import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;
import com.capscrum.school.erp.dataaccessor.exception.ResourceNotFoundException;
import com.capscrum.school.erp.dataaccessor.model.Role;
import com.capscrum.school.erp.dataaccessor.model.User;
import com.capscrum.school.erp.dataaccessor.repository.RoleRepository;
import com.capscrum.school.erp.dataaccessor.repository.UserRepository;
import com.capscrum.school.erp.dataaccessor.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToDto(user);
    }

    @Override
    @Transactional
    public UserDto updateUser(String id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (userDto.getFullName() != null) {
            user.setFullName(userDto.getFullName());
        }
        if (userDto.getEmail() != null && !userDto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new BadRequestException("Email '" + userDto.getEmail() + "' is already in use");
            }
            user.setEmail(userDto.getEmail());
        }
        user.setEnabled(userDto.isEnabled());

        User updated = userRepository.save(user);
        log.info("Updated user: {}", updated.getUsername());
        return mapToDto(updated);
    }

    @Override
    @Transactional
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        log.info("Deleted user with id: {}", id);
    }

    @Override
    @Transactional
    public UserDto assignRoles(String userId, Set<String> roleNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByName(roleName.toUpperCase())
                    .orElseThrow(() -> new BadRequestException("Role '" + roleName + "' not found"));
            roles.add(role);
        }
        user.setRoles(roles);

        User updated = userRepository.save(user);
        log.info("Assigned roles {} to user '{}'", roleNames, user.getUsername());
        return mapToDto(updated);
    }

    @Override
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return mapToDto(user);
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setEnabled(user.isEnabled());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        dto.setRoles(user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet()));
        return dto;
    }
}
