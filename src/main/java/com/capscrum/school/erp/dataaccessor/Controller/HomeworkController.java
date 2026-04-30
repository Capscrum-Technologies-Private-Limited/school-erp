package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.Homework;
import com.capscrum.school.erp.dataaccessor.service.HomeworkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/homework")
public class HomeworkController extends AbstractCrudController<Homework, String> {

    private static final Logger log = LoggerFactory.getLogger(HomeworkController.class);
    private final HomeworkService homeworkService;

    public HomeworkController(HomeworkService homeworkService) {
        super("Homework", log, homeworkService);
        this.homeworkService = homeworkService;
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<Homework>> getByParent(@PathVariable String parentId) {
        log.info("Fetching homework for parent with ID: {}", parentId);
        return ResponseEntity.ok(homeworkService.getByParent(parentId));
    }
}
