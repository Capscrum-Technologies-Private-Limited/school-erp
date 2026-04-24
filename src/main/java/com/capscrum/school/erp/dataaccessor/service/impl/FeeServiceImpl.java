package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;
import com.capscrum.school.erp.dataaccessor.exception.ResourceNotFoundException;
import com.capscrum.school.erp.dataaccessor.model.Fee;
import com.capscrum.school.erp.dataaccessor.model.Payment;
import com.capscrum.school.erp.dataaccessor.repository.FeeRepository;
import com.capscrum.school.erp.dataaccessor.repository.PaymentRepository;
import com.capscrum.school.erp.dataaccessor.service.FeeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeeServiceImpl extends AbstractCrudService<Fee, String> implements FeeService {

    private final FeeRepository feeRepository;
    private final PaymentRepository paymentRepository;

    public FeeServiceImpl(FeeRepository feeRepository, PaymentRepository paymentRepository) {
        super("Fee", feeRepository);
        this.feeRepository = feeRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(Fee source, Fee target) {
        target.setAmount(source.getAmount());
        target.setDueDate(source.getDueDate());
        target.setStatus(source.getStatus());
        target.setPeriod(source.getPeriod());
        // student and feeStructure are not updated after creation
    }

    @Override
    @LogPerformance
    public List<Fee> getFeesByStudentId(String studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    @Override
    @LogPerformance
    public List<Fee> getPendingFeesByStudentId(String studentId) {
        return feeRepository.findByStudentIdAndStatus(studentId, "PENDING");
    }

    @Override
    @Transactional
    @LogPerformance
    public Fee recordPayment(String feeId, BigDecimal amount, String paymentMethod, String transactionId) {
        Fee fee = feeRepository.findById(feeId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee with id " + feeId + " not found"));

        if ("PAID".equals(fee.getStatus())) {
            throw new BadRequestException("Fee is already fully paid");
        }

        if ("WAIVED".equals(fee.getStatus())) {
            throw new BadRequestException("Fee has been waived and cannot accept payments");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Payment amount must be greater than zero");
        }

        BigDecimal remainingAmount = fee.getAmount().subtract(fee.getAmountPaid());
        if (amount.compareTo(remainingAmount) > 0) {
            throw new BadRequestException("Payment amount " + amount + " exceeds remaining balance " + remainingAmount);
        }

        // Create payment record
        Payment payment = new Payment();
        payment.setFee(fee);
        payment.setAmountPaid(amount);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentMethod(paymentMethod);
        payment.setTransactionId(transactionId);
        payment.setReceiptNumber("RCP-" + System.currentTimeMillis());
        payment.setStatus("SUCCESS");
        paymentRepository.save(payment);

        // Update fee
        fee.setAmountPaid(fee.getAmountPaid().add(amount));
        if (fee.getAmountPaid().compareTo(fee.getAmount()) >= 0) {
            fee.setStatus("PAID");
        } else {
            fee.setStatus("PARTIALLY_PAID");
        }

        return feeRepository.save(fee);
    }

    @Override
    @Transactional
    @LogPerformance
    public Fee waiveFee(String feeId, String reason) {
        Fee fee = feeRepository.findById(feeId)
                .orElseThrow(() -> new ResourceNotFoundException("Fee with id " + feeId + " not found"));

        if ("PAID".equals(fee.getStatus())) {
            throw new BadRequestException("Cannot waive a fee that is already fully paid");
        }

        fee.setStatus("WAIVED");
        return feeRepository.save(fee);
    }
}
