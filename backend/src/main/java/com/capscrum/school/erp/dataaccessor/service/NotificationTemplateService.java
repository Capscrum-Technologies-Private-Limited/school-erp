package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.NotificationTemplate;

import java.util.Optional;

public interface NotificationTemplateService extends CrudService<NotificationTemplate, String> {
    Optional<NotificationTemplate> getByCode(String code);
}
