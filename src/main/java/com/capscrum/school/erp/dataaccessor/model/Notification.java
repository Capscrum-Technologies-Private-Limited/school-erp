package com.capscrum.school.erp.dataaccessor.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "notifications")
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(nullable = false)
    private String type; // ADMISSION_APPROVED, ADMISSION_REJECTED, FEE_PAYMENT_CONFIRMATION, FEE_REMINDER

    @Column(nullable = false)
    private String channel; // EMAIL, SMS, BOTH

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, SENT, FAILED

    private String referenceId; // ID of the related entity (admission, fee, etc.)

    private String referenceType; // ADMISSION, FEE, PAYMENT

    private String failureReason;
}
