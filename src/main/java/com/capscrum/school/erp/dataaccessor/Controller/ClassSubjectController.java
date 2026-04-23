package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.ClassSubject;
import com.capscrum.school.erp.dataaccessor.service.ClassSubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/class-subjects")
public class ClassSubjectController extends AbstractCrudController<ClassSubject, String> {

    public static final Logger log = LoggerFactory.getLogger(ClassSubjectController.class);

    public ClassSubjectController(ClassSubjectService service) {
        super("ClassSubject", log, service);
    }
}
