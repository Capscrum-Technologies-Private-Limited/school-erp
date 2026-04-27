package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.StaffAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StaffAttendanceRepository extends JpaRepository<StaffAttendance, String> {
    Optional<StaffAttendance> findByUserIdAndDate(String userId, LocalDate date);
    List<StaffAttendance> findByUserId(String userId);
    List<StaffAttendance> findByDate(LocalDate date);
}
