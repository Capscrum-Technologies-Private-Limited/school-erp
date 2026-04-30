package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.SchoolClass;
import com.capscrum.school.erp.dataaccessor.service.SchoolClassService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/classes")
public class SchoolClassController extends AbstractCrudController<SchoolClass, String> {

    public static final Logger log = LoggerFactory.getLogger(SchoolClassController.class);

    public SchoolClassController(SchoolClassService service) {
        super("SchoolClass", log, service);
    }
}
