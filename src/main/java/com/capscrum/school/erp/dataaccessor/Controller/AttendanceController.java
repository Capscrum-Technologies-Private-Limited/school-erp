package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.Attendance;
import com.capscrum.school.erp.dataaccessor.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController extends AbstractCrudController<Attendance, String> {

    public static final Logger log = LoggerFactory.getLogger(AttendanceController.class);

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        super("Attendance", log, attendanceService);
        this.attendanceService = attendanceService;
    }

    @Operation(summary = "Mark attendance for multiple students in bulk")
    @PostMapping("/bulk")
    public ResponseEntity<List<Attendance>> markBulkAttendance(@RequestBody List<Attendance> attendanceList) {
        log.info("Marking bulk attendance for {} students", attendanceList.size());
        List<Attendance> saved = attendanceService.markBulkAttendance(attendanceList);
        return ResponseEntity.ok(saved);
    }

    @Operation(summary = "Get attendance for a class on a specific date")
    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Attendance>> getAttendanceByClassAndDate(
            @PathVariable String classId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Attendance> attendance = attendanceService.getAttendanceByClassAndDate(classId, date);
        return ResponseEntity.ok(attendance);
    }

    @Operation(summary = "Get attendance report for a student within a date range")
    @GetMapping("/student/{studentId}/report")
    public ResponseEntity<List<Attendance>> getStudentAttendanceReport(
            @PathVariable String studentId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Attendance> report = attendanceService.getStudentAttendanceReport(studentId, startDate, endDate);
        return ResponseEntity.ok(report);
    }
}
