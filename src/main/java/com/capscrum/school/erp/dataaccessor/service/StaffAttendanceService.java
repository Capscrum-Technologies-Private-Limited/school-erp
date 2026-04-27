package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.StaffAttendance;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StaffAttendanceService extends CrudService<StaffAttendance, String> {
    Optional<StaffAttendance> getByUserAndDate(String userId, LocalDate date);
    List<StaffAttendance> getByUser(String userId);
    List<StaffAttendance> getByDate(LocalDate date);
}
