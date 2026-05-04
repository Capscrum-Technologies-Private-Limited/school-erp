package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.AdmissionDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdmissionDocumentRepository extends JpaRepository<AdmissionDocument, String> {
    List<AdmissionDocument> findByAdmissionId(String admissionId);
}
