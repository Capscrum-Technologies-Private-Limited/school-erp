package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.Fee;
import com.capscrum.school.erp.dataaccessor.service.FeeService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/fees")
public class FeeController extends AbstractCrudController<Fee, String> {

    public static final Logger log = LoggerFactory.getLogger(FeeController.class);

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        super("Fee", log, feeService);
        this.feeService = feeService;
    }

    @Operation(summary = "Get all fees for a student")
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Fee>> getFeesByStudent(@PathVariable String studentId) {
        List<Fee> fees = feeService.getFeesByStudentId(studentId);
        return ResponseEntity.ok(fees);
    }

    @Operation(summary = "Get pending (unpaid) fees for a student")
    @GetMapping("/student/{studentId}/pending")
    public ResponseEntity<List<Fee>> getPendingFeesByStudent(@PathVariable String studentId) {
        List<Fee> fees = feeService.getPendingFeesByStudentId(studentId);
        return ResponseEntity.ok(fees);
    }

    @Operation(summary = "Record a payment against a fee")
    @PostMapping("/{feeId}/pay")
    public ResponseEntity<Fee> recordPayment(
            @PathVariable String feeId,
            @RequestParam BigDecimal amount,
            @RequestParam String paymentMethod,
            @RequestParam(required = false) String transactionId) {
        Fee updatedFee = feeService.recordPayment(feeId, amount, paymentMethod, transactionId);
        return ResponseEntity.ok(updatedFee);
    }

    @Operation(summary = "Waive a fee")
    @PostMapping("/{feeId}/waive")
    public ResponseEntity<Fee> waiveFee(
            @PathVariable String feeId,
            @RequestParam(required = false, defaultValue = "No reason provided") String reason) {
        Fee waived = feeService.waiveFee(feeId, reason);
        return ResponseEntity.ok(waived);
    }
}
