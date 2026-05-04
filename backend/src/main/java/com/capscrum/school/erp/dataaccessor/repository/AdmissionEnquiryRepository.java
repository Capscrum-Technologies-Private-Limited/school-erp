package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.AdmissionEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionEnquiryRepository extends JpaRepository<AdmissionEnquiry, String> {
    Optional<AdmissionEnquiry> findByEnquiryCode(String enquiryCode);
    List<AdmissionEnquiry> findBySchoolId(String schoolId);
}
