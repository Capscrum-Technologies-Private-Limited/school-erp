package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.NotificationRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient, String> {
    List<NotificationRecipient> findByNotificationId(String notificationId);
    List<NotificationRecipient> findByStatus(String status);
    List<NotificationRecipient> findByRecipientEmail(String email);
}
