package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;
import com.capscrum.school.erp.dataaccessor.exception.ResourceNotFoundException;
import com.capscrum.school.erp.dataaccessor.model.Admission;
import com.capscrum.school.erp.dataaccessor.model.Student;
import com.capscrum.school.erp.dataaccessor.repository.AdmissionRepository;
import com.capscrum.school.erp.dataaccessor.repository.StudentRepository;
import com.capscrum.school.erp.dataaccessor.service.AdmissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdmissionServiceImpl extends AbstractCrudService<Admission, String> implements AdmissionService {

    private final AdmissionRepository admissionRepository;
    private final StudentRepository studentRepository;

    public AdmissionServiceImpl(AdmissionRepository admissionRepository, StudentRepository studentRepository) {
        super("Admission", admissionRepository);
        this.admissionRepository = admissionRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(Admission source, Admission target) {
        target.setApplicantName(source.getApplicantName());
        target.setDateOfBirth(source.getDateOfBirth());
        target.setGender(source.getGender());
        target.setGradeApplyingFor(source.getGradeApplyingFor());
        target.setAcademicYearId(source.getAcademicYearId());
        target.setParentName(source.getParentName());
        target.setParentPhone(source.getParentPhone());
        target.setParentEmail(source.getParentEmail());
        target.setPreviousSchool(source.getPreviousSchool());
        target.setStatus(source.getStatus());
    }

    @Override
    @Transactional
    @LogPerformance
    public Admission approveAdmission(String admissionId, String reviewedBy) {
        Admission admission = admissionRepository.findById(admissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Admission with id " + admissionId + " not found"));

        if (!"PENDING".equals(admission.getStatus()) && !"UNDER_REVIEW".equals(admission.getStatus())) {
            throw new BadRequestException("Admission cannot be approved as it is in status: " + admission.getStatus());
        }

        Student student = new Student();
        student.setSchool(admission.getSchool());
        student.setStudentCode("STU-" + System.currentTimeMillis()); 
        
        String[] nameParts = admission.getApplicantName() != null ? admission.getApplicantName().split(" ", 2) : new String[]{"", ""};
        student.setFirstName(nameParts[0]);
        student.setLastName(nameParts.length > 1 ? nameParts[1] : "");
        
        student.setDateOfBirth(admission.getDateOfBirth());
        student.setGender(admission.getGender());
        student.setPreviousSchool(admission.getPreviousSchool());
        student.setStatus("ACTIVE");
        student.setCreatedBy(reviewedBy);
        student.setUpdatedBy(reviewedBy);

        Student savedStudent = studentRepository.save(student);

        admission.setStatus("APPROVED");
        admission.setStudent(savedStudent);
        admission.setUpdatedBy(reviewedBy);

        return admissionRepository.save(admission);
    }

    @Override
    @Transactional
    @LogPerformance
    public Admission rejectAdmission(String admissionId, String reason, String reviewedBy) {
         Admission admission = admissionRepository.findById(admissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Admission with id " + admissionId + " not found"));

        if (!"PENDING".equals(admission.getStatus()) && !"UNDER_REVIEW".equals(admission.getStatus())) {
            throw new BadRequestException("Admission cannot be rejected as it is in status: " + admission.getStatus());
        }

        admission.setStatus("REJECTED");
        admission.setRejectionReason(reason);
        admission.setUpdatedBy(reviewedBy);

        return admissionRepository.save(admission);
    }
}
