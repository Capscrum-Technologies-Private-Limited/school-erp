package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.FeeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeStructureRepository extends JpaRepository<FeeStructure, String> {
    List<FeeStructure> findBySchoolIdAndAcademicYearId(String schoolId, String academicYearId);
    List<FeeStructure> findBySchoolIdAndIsActiveTrue(String schoolId);
    List<FeeStructure> findByAcademicYearIdAndFeeCategoryId(String academicYearId, String feeCategoryId);
}
