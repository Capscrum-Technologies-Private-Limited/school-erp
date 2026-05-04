package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.constant.NotificationReferenceType;
import com.capscrum.school.erp.dataaccessor.model.Notification;
import com.capscrum.school.erp.dataaccessor.model.NotificationRecipient;

import java.util.List;

public interface NotificationService extends CrudService<Notification, String> {

    /**
     * Send a notification for an admission approval.
     */
    Notification sendAdmissionApprovalNotification(String admissionId, String recipientName,
                                                    String recipientEmail, String recipientPhone);

    /**
     * Send a notification for an admission rejection.
     */
    Notification sendAdmissionRejectionNotification(String admissionId, String recipientName,
                                                     String recipientEmail, String recipientPhone,
                                                     String rejectionReason);

    /**
     * Send a notification for a fee payment confirmation.
     */
    Notification sendFeePaymentConfirmation(String paymentId, String recipientName,
                                             String recipientEmail, String recipientPhone,
                                             String feeDetails, String amountPaid);

    /**
     * Get all recipients for a notification.
     */
    List<NotificationRecipient> getRecipientsByNotificationId(String notificationId);

    /**
     * Get notifications by reference (e.g. all notifications for an admission).
     */
    List<Notification> getByReference(String referenceId, NotificationReferenceType referenceType);
}
