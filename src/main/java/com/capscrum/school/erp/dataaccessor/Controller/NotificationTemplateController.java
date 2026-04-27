package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.model.NotificationTemplate;
import com.capscrum.school.erp.dataaccessor.service.NotificationTemplateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification-templates")
public class NotificationTemplateController extends AbstractCrudController<NotificationTemplate, String> {

    private static final Logger log = LoggerFactory.getLogger(NotificationTemplateController.class);

    public NotificationTemplateController(NotificationTemplateService templateService) {
        super("NotificationTemplate", log, templateService);
    }
}
