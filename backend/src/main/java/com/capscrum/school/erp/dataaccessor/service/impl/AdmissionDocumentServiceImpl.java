package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.AdmissionDocument;
import com.capscrum.school.erp.dataaccessor.repository.AdmissionDocumentRepository;
import com.capscrum.school.erp.dataaccessor.service.AdmissionDocumentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionDocumentServiceImpl extends AbstractCrudService<AdmissionDocument, String> implements AdmissionDocumentService {

    private final AdmissionDocumentRepository documentRepository;

    public AdmissionDocumentServiceImpl(AdmissionDocumentRepository documentRepository) {
        super("AdmissionDocument", documentRepository);
        this.documentRepository = documentRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(AdmissionDocument source, AdmissionDocument target) {
        target.setDocumentType(source.getDocumentType());
        target.setFileUrl(source.getFileUrl());
    }

    @Override
    public List<AdmissionDocument> getByAdmissionId(String admissionId) {
        return documentRepository.findByAdmissionId(admissionId);
    }
}
