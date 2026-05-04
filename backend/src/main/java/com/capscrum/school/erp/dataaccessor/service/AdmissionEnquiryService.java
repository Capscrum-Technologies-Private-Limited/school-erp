package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.AdmissionEnquiry;

import java.util.List;
import java.util.Optional;

public interface AdmissionEnquiryService extends CrudService<AdmissionEnquiry, String> {
    Optional<AdmissionEnquiry> getByEnquiryCode(String enquiryCode);
    List<AdmissionEnquiry> getBySchool(String schoolId);
}
