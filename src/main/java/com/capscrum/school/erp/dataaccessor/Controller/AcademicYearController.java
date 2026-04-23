package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.AcademicYear;
import com.capscrum.school.erp.dataaccessor.service.AcademicYearService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/academic-years")
public class AcademicYearController extends AbstractCrudController<AcademicYear, String> {

    public static final Logger log = LoggerFactory.getLogger(AcademicYearController.class);

    public AcademicYearController(AcademicYearService service) {
        super("AcademicYear", log, service);
    }
}
