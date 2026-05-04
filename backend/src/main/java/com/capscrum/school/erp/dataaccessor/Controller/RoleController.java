package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.Role;
import com.capscrum.school.erp.dataaccessor.repository.RoleRepository;
import com.capscrum.school.erp.dataaccessor.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@Tag(name = "Role Management", description = "View roles and permissions (Super Admin only)")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Operation(summary = "Get all roles")
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(roleRepository.findAll());
    }

    @Operation(summary = "Get role by ID with permissions")
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable String id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
        return ResponseEntity.ok(role);
    }

    @Operation(summary = "Get role by name")
    @GetMapping("/name/{name}")
    public ResponseEntity<Role> getRoleByName(@PathVariable String name) {
        Role role = roleRepository.findByName(name.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + name));
        return ResponseEntity.ok(role);
    }
}
