package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.Admission;
import com.capscrum.school.erp.dataaccessor.service.AdmissionService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/capscrum/school-erp/admissions")
public class AdmissionController extends AbstractCrudController<Admission, String> {

    public static final Logger log = LoggerFactory.getLogger(AdmissionController.class);

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        super("Admission", log, admissionService);
        this.admissionService = admissionService;
    }

    @Operation(summary = "Approve an admission and convert to Student")
    @PostMapping("/{id}/approve")
    public ResponseEntity<Admission> approveAdmission(
            @PathVariable String id,
            @RequestParam(required = false, defaultValue = "system") String reviewedBy) {
        Admission approved = admissionService.approveAdmission(id, reviewedBy);
        return ResponseEntity.ok(approved);
    }

    @Operation(summary = "Reject an admission application")
    @PostMapping("/{id}/reject")
    public ResponseEntity<Admission> rejectAdmission(
            @PathVariable String id,
            @RequestParam String reason,
            @RequestParam(required = false, defaultValue = "system") String reviewedBy) {
        Admission rejected = admissionService.rejectAdmission(id, reason, reviewedBy);
        return ResponseEntity.ok(rejected);
    }
}
