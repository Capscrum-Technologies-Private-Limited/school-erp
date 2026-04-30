package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.constant.NotificationChannel;
import com.capscrum.school.erp.dataaccessor.constant.NotificationReferenceType;
import com.capscrum.school.erp.dataaccessor.constant.NotificationStatus;
import com.capscrum.school.erp.dataaccessor.constant.NotificationType;
import com.capscrum.school.erp.dataaccessor.model.Notification;
import com.capscrum.school.erp.dataaccessor.model.NotificationRecipient;
import com.capscrum.school.erp.dataaccessor.model.School;
import com.capscrum.school.erp.dataaccessor.repository.NotificationRecipientRepository;
import com.capscrum.school.erp.dataaccessor.repository.NotificationRepository;
import com.capscrum.school.erp.dataaccessor.service.MessageSender;
import com.capscrum.school.erp.dataaccessor.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl extends AbstractCrudService<Notification, String> implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;
    private final NotificationRecipientRepository recipientRepository;
    private final Map<String, MessageSender> sendersByChannel;

    public NotificationServiceImpl(NotificationRepository notificationRepository,
                                    NotificationRecipientRepository recipientRepository,
                                    List<MessageSender> messageSenders) {
        super("Notification", notificationRepository);
        this.notificationRepository = notificationRepository;
        this.recipientRepository = recipientRepository;
        this.sendersByChannel = messageSenders.stream()
                .collect(Collectors.toMap(MessageSender::getChannel, Function.identity()));
    }

    @Override
    protected void copyPropertiesOnUpdate(Notification source, Notification target) {
        target.setSubject(source.getSubject());
        target.setBody(source.getBody());
        target.setStatus(source.getStatus());
    }

    @Override
    @Transactional
    @LogPerformance
    public Notification sendAdmissionApprovalNotification(String admissionId, String recipientName,
                                                           String recipientEmail, String recipientPhone) {
        String subject = "Admission Approved - School ERP";
        String body = String.format(
                "Dear %s,\n\nWe are pleased to inform you that your admission application (ID: %s) has been approved.\n\n"
                + "Please visit the school office to complete the enrollment process.\n\n"
                + "Best regards,\nSchool Administration",
                recipientName, admissionId);

        return createAndSendNotification(NotificationType.ADMISSION_APPROVED, subject, body,
                admissionId, NotificationReferenceType.ADMISSION, recipientName, recipientEmail, recipientPhone);
    }

    @Override
    @Transactional
    @LogPerformance
    public Notification sendAdmissionRejectionNotification(String admissionId, String recipientName,
                                                            String recipientEmail, String recipientPhone,
                                                            String rejectionReason) {
        String subject = "Admission Application Update - School ERP";
        String body = String.format(
                "Dear %s,\n\nWe regret to inform you that your admission application (ID: %s) could not be approved.\n\n"
                + "Reason: %s\n\n"
                + "If you have any questions, please contact the school office.\n\n"
                + "Best regards,\nSchool Administration",
                recipientName, admissionId, rejectionReason);

        return createAndSendNotification(NotificationType.ADMISSION_REJECTED, subject, body,
                admissionId, NotificationReferenceType.ADMISSION, recipientName, recipientEmail, recipientPhone);
    }

    @Override
    @Transactional
    @LogPerformance
    public Notification sendFeePaymentConfirmation(String paymentId, String recipientName,
                                                    String recipientEmail, String recipientPhone,
                                                    String feeDetails, String amountPaid) {
        String subject = "Payment Confirmation - School ERP";
        String body = String.format(
                "Dear %s,\n\nYour payment has been received successfully.\n\n"
                + "Payment ID: %s\nFee: %s\nAmount Paid: %s\n\n"
                + "Thank you for your prompt payment.\n\n"
                + "Best regards,\nSchool Administration",
                recipientName, paymentId, feeDetails, amountPaid);

        return createAndSendNotification(NotificationType.FEE_PAYMENT_CONFIRMATION, subject, body,
                paymentId, NotificationReferenceType.PAYMENT, recipientName, recipientEmail, recipientPhone);
    }

    @Override
    @LogPerformance
    public List<NotificationRecipient> getRecipientsByNotificationId(String notificationId) {
        return recipientRepository.findByNotificationId(notificationId);
    }

    @Override
    @LogPerformance
    public List<Notification> getByReference(String referenceId, NotificationReferenceType referenceType) {
        return notificationRepository.findByReferenceIdAndReferenceType(referenceId, referenceType.name());
    }

    // --- Private helpers ---

    private Notification createAndSendNotification(NotificationType type, String subject, String body,
                                                    String referenceId, NotificationReferenceType referenceType,
                                                    String recipientName, String recipientEmail,
                                                    String recipientPhone) {
        // Determine channel
        NotificationChannel channel = determineChannel(recipientEmail, recipientPhone);
        log.info("Preparing to send {} notification via {} for reference: {}", type, channel, referenceId);

        // Create notification
        Notification notification = new Notification();
        notification.setSchool(getDefaultSchool());
        notification.setType(type);
        notification.setChannel(channel);
        notification.setSubject(subject);
        notification.setBody(body);
        notification.setReferenceId(referenceId);
        notification.setReferenceType(referenceType);
        notification.setStatus(NotificationStatus.PENDING);

        notification = notificationRepository.save(notification);

        // Create and send to recipient
        NotificationRecipient recipient = new NotificationRecipient();
        recipient.setNotification(notification);
        recipient.setRecipientName(recipientName);
        recipient.setRecipientEmail(recipientEmail);
        recipient.setRecipientPhone(recipientPhone);
        recipient.setStatus(NotificationStatus.PENDING);

        boolean sent = dispatchNotification(channel, recipientEmail, recipientPhone, subject, body);

        if (sent) {
            recipient.setStatus(NotificationStatus.SENT);
            recipient.setSentAt(LocalDateTime.now());
            notification.setStatus(NotificationStatus.SENT);
            log.info("Successfully sent notification (ID: {}) to {}", notification.getId(), recipientName);
        } else {
            recipient.setStatus(NotificationStatus.FAILED);
            recipient.setFailureReason("Failed to send via " + channel);
            notification.setStatus(NotificationStatus.FAILED);
            notification.setFailureReason("Delivery failed");
            log.error("Failed to send notification (ID: {}) to {} via channel {}", notification.getId(), recipientName, channel);
        }

        recipientRepository.save(recipient);
        return notificationRepository.save(notification);
    }

    private boolean dispatchNotification(NotificationChannel channel, String email, String phone,
                                          String subject, String body) {
        boolean emailSent = false;
        boolean smsSent = false;

        if ((NotificationChannel.EMAIL.equals(channel) || NotificationChannel.BOTH.equals(channel)) && email != null) {
            MessageSender emailSender = sendersByChannel.get("EMAIL");
            if (emailSender != null) {
                emailSent = emailSender.send(email, subject, body);
            }
        }

        if ((NotificationChannel.SMS.equals(channel) || NotificationChannel.BOTH.equals(channel)) && phone != null) {
            MessageSender smsSender = sendersByChannel.get("SMS");
            if (smsSender != null) {
                smsSent = smsSender.send(phone, subject, body);
            }
        }

        return emailSent || smsSent;
    }

    private NotificationChannel determineChannel(String email, String phone) {
        if (email != null && phone != null) return NotificationChannel.BOTH;
        if (email != null) return NotificationChannel.EMAIL;
        if (phone != null) return NotificationChannel.SMS;
        return NotificationChannel.EMAIL; // default
    }

    private School getDefaultSchool() {
        // In a real implementation, this would come from the context or be passed as a parameter.
        // For now, we create a placeholder that will be set by the caller.
        return null;
    }
}
