package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.constant.NotificationReferenceType;
import com.capscrum.school.erp.dataaccessor.model.Notification;
import com.capscrum.school.erp.dataaccessor.model.NotificationRecipient;
import com.capscrum.school.erp.dataaccessor.service.NotificationService;
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

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController extends AbstractCrudController<Notification, String> {

    public static final Logger log = LoggerFactory.getLogger(NotificationController.class);

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        super("Notification", log, notificationService);
        this.notificationService = notificationService;
    }

    @Operation(summary = "Send admission approval notification")
    @PostMapping("/admission-approved")
    public ResponseEntity<Notification> sendAdmissionApproval(
            @RequestParam String admissionId,
            @RequestParam String recipientName,
            @RequestParam(required = false) String recipientEmail,
            @RequestParam(required = false) String recipientPhone) {
        Notification notification = notificationService.sendAdmissionApprovalNotification(
                admissionId, recipientName, recipientEmail, recipientPhone);
        return ResponseEntity.ok(notification);
    }

    @Operation(summary = "Send admission rejection notification")
    @PostMapping("/admission-rejected")
    public ResponseEntity<Notification> sendAdmissionRejection(
            @RequestParam String admissionId,
            @RequestParam String recipientName,
            @RequestParam(required = false) String recipientEmail,
            @RequestParam(required = false) String recipientPhone,
            @RequestParam String rejectionReason) {
        Notification notification = notificationService.sendAdmissionRejectionNotification(
                admissionId, recipientName, recipientEmail, recipientPhone, rejectionReason);
        return ResponseEntity.ok(notification);
    }

    @Operation(summary = "Send fee payment confirmation notification")
    @PostMapping("/fee-payment")
    public ResponseEntity<Notification> sendFeePaymentConfirmation(
            @RequestParam String paymentId,
            @RequestParam String recipientName,
            @RequestParam(required = false) String recipientEmail,
            @RequestParam(required = false) String recipientPhone,
            @RequestParam String feeDetails,
            @RequestParam String amountPaid) {
        Notification notification = notificationService.sendFeePaymentConfirmation(
                paymentId, recipientName, recipientEmail, recipientPhone, feeDetails, amountPaid);
        return ResponseEntity.ok(notification);
    }

    @Operation(summary = "Get recipients for a notification")
    @GetMapping("/{notificationId}/recipients")
    public ResponseEntity<List<NotificationRecipient>> getRecipients(@PathVariable String notificationId) {
        List<NotificationRecipient> recipients = notificationService.getRecipientsByNotificationId(notificationId);
        return ResponseEntity.ok(recipients);
    }

    @Operation(summary = "Get notifications by reference entity")
    @GetMapping("/by-reference")
    public ResponseEntity<List<Notification>> getByReference(
            @RequestParam String referenceId,
            @RequestParam NotificationReferenceType referenceType) {
        List<Notification> notifications = notificationService.getByReference(referenceId, referenceType);
        return ResponseEntity.ok(notifications);
    }
}
