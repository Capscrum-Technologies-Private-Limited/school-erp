package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.constant.PaymentMethod;
import com.capscrum.school.erp.dataaccessor.model.Fee;

import java.util.List;

public interface FeeService extends CrudService<Fee, String> {
    List<Fee> getFeesByStudentId(String studentId);
    List<Fee> getPendingFeesByStudentId(String studentId);
    Fee recordPayment(String feeId, java.math.BigDecimal amount, PaymentMethod paymentMethod, String transactionId);
    Fee waiveFee(String feeId, String reason);
}
