package com.capscrum.school.erp.dataaccessor.config;

import com.capscrum.school.erp.dataaccessor.model.Permission;
import com.capscrum.school.erp.dataaccessor.model.Role;
import com.capscrum.school.erp.dataaccessor.model.User;
import com.capscrum.school.erp.dataaccessor.repository.PermissionRepository;
import com.capscrum.school.erp.dataaccessor.repository.RoleRepository;
import com.capscrum.school.erp.dataaccessor.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Seeds default roles, permissions, and a super admin user on first run.
 * Based on the Permission Matrix from the School ERP Entity Design Document.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(RoleRepository roleRepository,
                      PermissionRepository permissionRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (roleRepository.count() > 0) {
            log.info("Database already seeded — skipping DataSeeder");
            return;
        }

        log.info("=== Seeding Auth & RBAC Data ===");

        // 1. Create permissions per module
        Map<String, Permission> permissionMap = seedPermissions();

        // 2. Create roles with permission mappings (from entity design doc)
        seedRoles(permissionMap);

        // 3. Create default super admin user
        seedSuperAdmin();

        log.info("=== Data seeding complete ===");
    }

    private Map<String, Permission> seedPermissions() {
        Map<String, Permission> map = new HashMap<>();

        // Modules from the entity design document
        String[][] modules = {
                {"AUTH", "Auth & User Management"},
                {"SCHOOL", "School & Class Setup"},
                {"ADMISSION", "Admissions"},
                {"STUDENT", "Student Records (SIS)"},
                {"ATTENDANCE", "Attendance"},
                {"FEE_STRUCTURE", "Fee Structures"},
                {"PAYMENT", "Payments"},
                {"DISCOUNT", "Discounts & Waivers"},
                {"HOMEWORK", "Homework"},
                {"LMS", "LMS"},
                {"LIBRARY", "Library"},
                {"INVENTORY", "Inventory & Assets"},
                {"TRANSPORT", "Transport"},
                {"NOTIFICATION", "Notifications"},
                {"MARKETING", "Marketing / Leads"},
                {"REPORT", "Reports & Analytics"},
                {"SYSTEM_CONFIG", "System Config"}
        };

        String[] actions = {"read", "write", "full", "read_own"};

        for (String[] module : modules) {
            for (String action : actions) {
                String permName = module[0].toLowerCase() + ":" + action;
                Permission perm = new Permission();
                perm.setName(permName);
                perm.setModule(module[0]);
                perm.setDescription(action.toUpperCase() + " access to " + module[1]);
                Permission saved = permissionRepository.save(perm);
                map.put(permName, saved);
                log.debug("Created permission: {}", permName);
            }
        }

        log.info("Seeded {} permissions across {} modules", map.size(), modules.length);
        return map;
    }

    private void seedRoles(Map<String, Permission> pm) {
        // SUPER_ADMIN — FULL access to everything
        createRole("SUPER_ADMIN", "Full system access — Principal, School Owner",
                getAllFullPermissions(pm));

        // ADMIN — FULL on most, no system config
        createRole("ADMIN", "All modules — no system config",
                Set.of(
                        pm.get("auth:write"), pm.get("school:full"), pm.get("admission:full"),
                        pm.get("student:full"), pm.get("attendance:full"), pm.get("fee_structure:full"),
                        pm.get("payment:full"), pm.get("discount:full"), pm.get("homework:full"),
                        pm.get("lms:full"), pm.get("library:full"), pm.get("inventory:full"),
                        pm.get("transport:full"), pm.get("notification:full"),
                        pm.get("marketing:full"), pm.get("report:full")
                ));

        // FINANCE_MANAGER
        createRole("FINANCE_MANAGER", "Finance modules + read reports",
                Set.of(
                        pm.get("auth:read"), pm.get("school:read"), pm.get("admission:read"),
                        pm.get("student:read"), pm.get("attendance:read"),
                        pm.get("fee_structure:full"), pm.get("payment:full"), pm.get("discount:full"),
                        pm.get("inventory:read"), pm.get("transport:read"),
                        pm.get("notification:write"), pm.get("report:read")
                ));

        // CLERK
        createRole("CLERK", "Record payments only — limited access",
                Set.of(
                        pm.get("school:read"), pm.get("admission:write"),
                        pm.get("student:read"), pm.get("fee_structure:read"),
                        pm.get("payment:write"), pm.get("notification:write"),
                        pm.get("marketing:write")
                ));

        // TEACHER
        createRole("TEACHER", "Own class + subjects access",
                Set.of(
                        pm.get("school:read"), pm.get("student:read"),
                        pm.get("attendance:write"), pm.get("homework:write"),
                        pm.get("lms:write"), pm.get("library:read"),
                        pm.get("notification:write"), pm.get("report:read_own")
                ));

        // LIBRARIAN
        createRole("LIBRARIAN", "Library module full access",
                Set.of(
                        pm.get("student:read"), pm.get("library:full"),
                        pm.get("inventory:read")
                ));

        // PARENT
        createRole("PARENT", "Own child records only",
                Set.of(
                        pm.get("student:read_own"), pm.get("attendance:read_own"),
                        pm.get("payment:read_own"), pm.get("homework:read_own"),
                        pm.get("lms:read_own"), pm.get("library:read_own"),
                        pm.get("transport:read_own"), pm.get("notification:read_own")
                ));

        // STUDENT
        createRole("STUDENT", "Own profile + LMS access",
                Set.of(
                        pm.get("student:read_own"), pm.get("attendance:read_own"),
                        pm.get("payment:read_own"), pm.get("homework:read_own"),
                        pm.get("lms:read_own"), pm.get("library:read_own"),
                        pm.get("transport:read_own"), pm.get("notification:read_own")
                ));

        log.info("Seeded 8 roles with permission mappings");
    }

    private Set<Permission> getAllFullPermissions(Map<String, Permission> pm) {
        Set<Permission> fullPerms = new HashSet<>();
        for (Map.Entry<String, Permission> entry : pm.entrySet()) {
            if (entry.getKey().endsWith(":full")) {
                fullPerms.add(entry.getValue());
            }
        }
        return fullPerms;
    }

    private void createRole(String name, String description, Set<Permission> permissions) {
        Role role = new Role();
        role.setName(name);
        role.setDescription(description);
        role.setPermissions(permissions);
        roleRepository.save(role);
        log.info("Created role: {} with {} permissions", name, permissions.size());
    }

    private void seedSuperAdmin() {
        if (userRepository.existsByUsername("admin")) {
            log.info("Super admin user already exists — skipping");
            return;
        }

        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@school.erp");
        admin.setPassword(passwordEncoder.encode("Admin@123"));
        admin.setFullName("System Administrator");
        admin.setEnabled(true);

        Role superAdminRole = roleRepository.findByName("SUPER_ADMIN")
                .orElseThrow(() -> new RuntimeException("SUPER_ADMIN role not found after seeding"));
        admin.setRoles(Set.of(superAdminRole));

        userRepository.save(admin);
        log.info("Created default super admin user: admin / admin@school.erp / Admin@123");
        log.warn("⚠ Change the default admin password immediately in production!");
    }
}
