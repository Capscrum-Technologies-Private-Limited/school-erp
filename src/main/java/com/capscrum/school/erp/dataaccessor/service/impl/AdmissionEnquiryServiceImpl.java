package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.AdmissionEnquiry;
import com.capscrum.school.erp.dataaccessor.repository.AdmissionEnquiryRepository;
import com.capscrum.school.erp.dataaccessor.service.AdmissionEnquiryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdmissionEnquiryServiceImpl extends AbstractCrudService<AdmissionEnquiry, String> implements AdmissionEnquiryService {

    private final AdmissionEnquiryRepository enquiryRepository;

    public AdmissionEnquiryServiceImpl(AdmissionEnquiryRepository enquiryRepository) {
        super("AdmissionEnquiry", enquiryRepository);
        this.enquiryRepository = enquiryRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(AdmissionEnquiry source, AdmissionEnquiry target) {
        target.setApplicantName(source.getApplicantName());
        target.setParentName(source.getParentName());
        target.setPhone(source.getPhone());
        target.setEmail(source.getEmail());
        target.setClassApplyingFor(source.getClassApplyingFor());
        target.setSource(source.getSource());
        target.setStatus(source.getStatus());
        target.setNotes(source.getNotes());
    }

    @Override
    public Optional<AdmissionEnquiry> getByEnquiryCode(String enquiryCode) {
        return enquiryRepository.findByEnquiryCode(enquiryCode);
    }

    @Override
    public List<AdmissionEnquiry> getBySchool(String schoolId) {
        return enquiryRepository.findBySchoolId(schoolId);
    }
}
