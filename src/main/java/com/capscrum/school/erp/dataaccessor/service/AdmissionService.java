package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.Admission;

public interface AdmissionService extends CrudService<Admission, String> {
    Admission approveAdmission(String admissionId, String reviewedBy);
    Admission rejectAdmission(String admissionId, String reason, String reviewedBy);
}
