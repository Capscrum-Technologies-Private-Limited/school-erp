package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.Parent;
import com.capscrum.school.erp.dataaccessor.model.StudentParent;
import com.capscrum.school.erp.dataaccessor.service.ParentService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
public class ParentController extends AbstractCrudController<Parent, String> {

    public static final Logger log = LoggerFactory.getLogger(ParentController.class);

    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        super("Parent", log, parentService);
        this.parentService = parentService;
    }

    @Operation(summary = "Link a student to a parent")
    @PostMapping("/{parentId}/students/{studentId}")
    public ResponseEntity<StudentParent> linkStudentToParent(
            @PathVariable String parentId,
            @PathVariable String studentId,
            @RequestParam(required = false, defaultValue = "false") boolean isPrimaryContact) {
        StudentParent link = parentService.linkStudentToParent(studentId, parentId, isPrimaryContact);
        return ResponseEntity.ok(link);
    }

    @Operation(summary = "Get all students linked to a parent")
    @GetMapping("/{parentId}/students")
    public ResponseEntity<List<StudentParent>> getStudentsByParent(@PathVariable String parentId) {
        List<StudentParent> students = parentService.getStudentsByParentId(parentId);
        return ResponseEntity.ok(students);
    }

    @Operation(summary = "Get all parents linked to a student")
    @GetMapping("/by-student/{studentId}")
    public ResponseEntity<List<StudentParent>> getParentsByStudent(@PathVariable String studentId) {
        List<StudentParent> parents = parentService.getParentsByStudentId(studentId);
        return ResponseEntity.ok(parents);
    }
}
