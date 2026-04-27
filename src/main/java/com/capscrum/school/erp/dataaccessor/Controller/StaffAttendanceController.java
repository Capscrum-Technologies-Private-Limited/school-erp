package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.StaffAttendance;
import com.capscrum.school.erp.dataaccessor.service.StaffAttendanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/staff-attendance")
public class StaffAttendanceController extends AbstractCrudController<StaffAttendance, String> {

    private static final Logger log = LoggerFactory.getLogger(StaffAttendanceController.class);

    public StaffAttendanceController(StaffAttendanceService attendanceService) {
        super("StaffAttendance", log, attendanceService);
    }
}
