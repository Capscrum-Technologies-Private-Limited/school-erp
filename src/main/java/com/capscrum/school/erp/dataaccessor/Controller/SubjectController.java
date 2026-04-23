package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.Subject;
import com.capscrum.school.erp.dataaccessor.service.SubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController extends AbstractCrudController<Subject, String> {

    public static final Logger log = LoggerFactory.getLogger(SubjectController.class);

    public SubjectController(SubjectService service) {
        super("Subject", log, service);
    }
}
