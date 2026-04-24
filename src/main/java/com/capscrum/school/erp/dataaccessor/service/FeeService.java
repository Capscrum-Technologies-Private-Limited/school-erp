package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.Fee;

import java.util.List;

public interface FeeService extends CrudService<Fee, String> {
    List<Fee> getFeesByStudentId(String studentId);
    List<Fee> getPendingFeesByStudentId(String studentId);
    Fee recordPayment(String feeId, java.math.BigDecimal amount, String paymentMethod, String transactionId);
    Fee waiveFee(String feeId, String reason);
}
