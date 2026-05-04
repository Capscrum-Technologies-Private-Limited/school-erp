package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.AdmissionDocument;

import java.util.List;

public interface AdmissionDocumentService extends CrudService<AdmissionDocument, String> {
    List<AdmissionDocument> getByAdmissionId(String admissionId);
}
