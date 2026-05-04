package com.capscrum.school.erp.dataaccessor.model;

import com.capscrum.school.erp.dataaccessor.constant.NotificationChannel;
import com.capscrum.school.erp.dataaccessor.constant.NotificationReferenceType;
import com.capscrum.school.erp.dataaccessor.constant.NotificationStatus;
import com.capscrum.school.erp.dataaccessor.constant.NotificationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @ManyToOne
    @JoinColumn(name = "template_id")
    private NotificationTemplate template;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type; // ADMISSION_APPROVED, ADMISSION_REJECTED, FEE_PAYMENT_CONFIRMATION, FEE_REMINDER

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationChannel channel; // EMAIL, SMS, BOTH

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationStatus status = NotificationStatus.PENDING; // PENDING, SENT, FAILED

    private String referenceId; // ID of the related entity (admission, fee, etc.)

    @Enumerated(EnumType.STRING)
    private NotificationReferenceType referenceType; // ADMISSION, FEE, PAYMENT

    private String failureReason;
}
