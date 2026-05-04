package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.StaffAttendance;
import com.capscrum.school.erp.dataaccessor.repository.StaffAttendanceRepository;
import com.capscrum.school.erp.dataaccessor.service.StaffAttendanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StaffAttendanceServiceImpl extends AbstractCrudService<StaffAttendance, String> implements StaffAttendanceService {

    private final StaffAttendanceRepository attendanceRepository;

    public StaffAttendanceServiceImpl(StaffAttendanceRepository attendanceRepository) {
        super("StaffAttendance", attendanceRepository);
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(StaffAttendance source, StaffAttendance target) {
        target.setCheckIn(source.getCheckIn());
        target.setCheckOut(source.getCheckOut());
        target.setStatus(source.getStatus());
    }

    @Override
    public Optional<StaffAttendance> getByUserAndDate(String userId, LocalDate date) {
        return attendanceRepository.findByUserIdAndDate(userId, date);
    }

    @Override
    public List<StaffAttendance> getByUser(String userId) {
        return attendanceRepository.findByUserId(userId);
    }

    @Override
    public List<StaffAttendance> getByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }
}
