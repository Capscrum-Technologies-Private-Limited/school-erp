package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.FeeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeeCategoryRepository extends JpaRepository<FeeCategory, String> {
    Optional<FeeCategory> findByNameAndSchoolId(String name, String schoolId);
    List<FeeCategory> findBySchoolId(String schoolId);
}
