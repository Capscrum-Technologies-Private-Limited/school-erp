package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.AdmissionDocument;
import com.capscrum.school.erp.dataaccessor.service.AdmissionDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admission-documents")
public class AdmissionDocumentController extends AbstractCrudController<AdmissionDocument, String> {

    private static final Logger log = LoggerFactory.getLogger(AdmissionDocumentController.class);

    public AdmissionDocumentController(AdmissionDocumentService documentService) {
        super("AdmissionDocument", log, documentService);
    }
}
