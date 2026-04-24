package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;
import com.capscrum.school.erp.dataaccessor.model.Attendance;
import com.capscrum.school.erp.dataaccessor.repository.AttendanceRepository;
import com.capscrum.school.erp.dataaccessor.service.AttendanceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttendanceServiceImpl extends AbstractCrudService<Attendance, String> implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
        super("Attendance", attendanceRepository);
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(Attendance source, Attendance target) {
        target.setStatus(source.getStatus());
        target.setRemarks(source.getRemarks());
        // student, schoolClass, academicYear, and date should not be changed after creation
    }

    @Override
    @Transactional
    @LogPerformance
    public List<Attendance> markBulkAttendance(List<Attendance> attendanceList) {
        List<Attendance> savedRecords = new ArrayList<>();
        for (Attendance attendance : attendanceList) {
            if (attendanceRepository.existsByStudentIdAndSchoolClassIdAndDate(
                    attendance.getStudent().getId(),
                    attendance.getSchoolClass().getId(),
                    attendance.getDate())) {
                throw new BadRequestException(
                        "Attendance already marked for student " + attendance.getStudent().getId()
                        + " in class " + attendance.getSchoolClass().getId()
                        + " on date " + attendance.getDate());
            }
            savedRecords.add(attendanceRepository.save(attendance));
        }
        return savedRecords;
    }

    @Override
    @LogPerformance
    public List<Attendance> getAttendanceByClassAndDate(String schoolClassId, LocalDate date) {
        return attendanceRepository.findBySchoolClassIdAndDate(schoolClassId, date);
    }

    @Override
    @LogPerformance
    public List<Attendance> getStudentAttendanceReport(String studentId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByStudentIdAndDateBetween(studentId, startDate, endDate);
    }
}
