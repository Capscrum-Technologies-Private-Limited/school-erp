package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.StudentParent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentParentRepository extends JpaRepository<StudentParent, String> {
    List<StudentParent> findByStudentId(String studentId);
    List<StudentParent> findByParentId(String parentId);
    boolean existsByStudentIdAndParentId(String studentId, String parentId);
}
