package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService extends CrudService<Attendance, String> {
    List<Attendance> markBulkAttendance(List<Attendance> attendanceList);
    List<Attendance> getAttendanceByClassAndDate(String schoolClassId, LocalDate date);
    List<Attendance> getStudentAttendanceReport(String studentId, LocalDate startDate, LocalDate endDate);
}
