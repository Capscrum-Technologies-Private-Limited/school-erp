package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findBySchoolId(String schoolId);
    List<Notification> findByStatus(String status);
    List<Notification> findByReferenceIdAndReferenceType(String referenceId, String referenceType);
    List<Notification> findByType(String type);
}
