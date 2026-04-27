package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.HomeworkSubmission;
import com.capscrum.school.erp.dataaccessor.service.HomeworkSubmissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/homework-submissions")
public class HomeworkSubmissionController extends AbstractCrudController<HomeworkSubmission, String> {

    private static final Logger log = LoggerFactory.getLogger(HomeworkSubmissionController.class);
    private final HomeworkSubmissionService submissionService;

    public HomeworkSubmissionController(HomeworkSubmissionService submissionService) {
        super("HomeworkSubmission", log, submissionService);
        this.submissionService = submissionService;
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<HomeworkSubmission>> getByParent(@PathVariable String parentId) {
        log.info("Fetching homework submissions for parent with ID: {}", parentId);
        return ResponseEntity.ok(submissionService.getByParent(parentId));
    }
}
