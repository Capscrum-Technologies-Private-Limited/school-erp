package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.Teacher;
import com.capscrum.school.erp.dataaccessor.service.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController extends AbstractCrudController<Teacher, String> {

    private static final Logger log = LoggerFactory.getLogger(TeacherController.class);

    public TeacherController(TeacherService teacherService) {
        super("Teacher", log, teacherService);
    }
}
