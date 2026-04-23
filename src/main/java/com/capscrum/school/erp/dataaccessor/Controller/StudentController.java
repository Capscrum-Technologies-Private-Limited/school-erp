package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.Student;
import com.capscrum.school.erp.dataaccessor.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController extends AbstractCrudController<Student, String> {

    public static final Logger log = LoggerFactory.getLogger(StudentController.class);

    public StudentController(StudentService studentService) {
        super("Student", log, studentService);
    }
}
