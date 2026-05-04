package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, String> {
    List<Attendance> findBySchoolClassIdAndDate(String schoolClassId, LocalDate date);
    List<Attendance> findByStudentIdAndDateBetween(String studentId, LocalDate startDate, LocalDate endDate);
    List<Attendance> findByStudentIdAndSchoolClassId(String studentId, String schoolClassId);
    boolean existsByStudentIdAndSchoolClassIdAndDate(String studentId, String schoolClassId, LocalDate date);
}
