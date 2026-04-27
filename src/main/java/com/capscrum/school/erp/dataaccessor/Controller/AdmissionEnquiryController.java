package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.AdmissionEnquiry;
import com.capscrum.school.erp.dataaccessor.service.AdmissionEnquiryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admission-enquiries")
public class AdmissionEnquiryController extends AbstractCrudController<AdmissionEnquiry, String> {

    private static final Logger log = LoggerFactory.getLogger(AdmissionEnquiryController.class);

    public AdmissionEnquiryController(AdmissionEnquiryService enquiryService) {
        super("AdmissionEnquiry", log, enquiryService);
    }
}
