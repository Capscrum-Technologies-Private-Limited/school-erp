package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.FeeStructure;
import com.capscrum.school.erp.dataaccessor.service.FeeStructureService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fee-structures")
public class FeeStructureController extends AbstractCrudController<FeeStructure, String> {

    public static final Logger log = LoggerFactory.getLogger(FeeStructureController.class);

    private final FeeStructureService feeStructureService;

    public FeeStructureController(FeeStructureService feeStructureService) {
        super("FeeStructure", log, feeStructureService);
        this.feeStructureService = feeStructureService;
    }

    @Operation(summary = "Get fee structures by school and academic year")
    @GetMapping("/by-school-year")
    public ResponseEntity<List<FeeStructure>> getBySchoolAndAcademicYear(
            @RequestParam String schoolId,
            @RequestParam String academicYearId) {
        List<FeeStructure> structures = feeStructureService.getBySchoolAndAcademicYear(schoolId, academicYearId);
        return ResponseEntity.ok(structures);
    }

    @Operation(summary = "Get active fee structures for a school")
    @GetMapping("/active")
    public ResponseEntity<List<FeeStructure>> getActiveBySchool(@RequestParam String schoolId) {
        List<FeeStructure> structures = feeStructureService.getActiveBySchool(schoolId);
        return ResponseEntity.ok(structures);
    }
}
