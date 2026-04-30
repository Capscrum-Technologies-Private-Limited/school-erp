package com.capscrum.school.erp.dataaccessor.controller;

import com.capscrum.school.erp.dataaccessor.model.FeeCategory;
import com.capscrum.school.erp.dataaccessor.service.FeeCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fee-categories")
public class FeeCategoryController extends AbstractCrudController<FeeCategory, String> {

    private static final Logger log = LoggerFactory.getLogger(FeeCategoryController.class);

    public FeeCategoryController(FeeCategoryService feeCategoryService) {
        super("FeeCategory", log, feeCategoryService);
    }
}
