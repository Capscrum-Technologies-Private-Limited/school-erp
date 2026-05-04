package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, String> {
    List<Fee> findByStudentId(String studentId);
    List<Fee> findByStudentIdAndStatus(String studentId, String status);
    List<Fee> findByFeeStructureId(String feeStructureId);
    List<Fee> findByStatus(String status);
}
