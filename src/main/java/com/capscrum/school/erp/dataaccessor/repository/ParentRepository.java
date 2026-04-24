package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent, String> {
    Optional<Parent> findByEmail(String email);
    List<Parent> findBySchoolId(String schoolId);
    Optional<Parent> findByUserId(String userId);
}
