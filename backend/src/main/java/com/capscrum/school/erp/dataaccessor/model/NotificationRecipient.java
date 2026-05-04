package com.capscrum.school.erp.dataaccessor.model;

import com.capscrum.school.erp.dataaccessor.constant.NotificationStatus;
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

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "notification_recipients")
public class NotificationRecipient extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "notification_id", nullable = false)
    private Notification notification;

    @Column(nullable = false)
    private String recipientName;

    private String recipientEmail;

    private String recipientPhone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationStatus status = NotificationStatus.PENDING; // PENDING, SENT, FAILED

    private LocalDateTime sentAt;

    private String failureReason;
}
