package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.NotificationTemplate;
import com.capscrum.school.erp.dataaccessor.repository.NotificationTemplateRepository;
import com.capscrum.school.erp.dataaccessor.service.NotificationTemplateService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationTemplateServiceImpl extends AbstractCrudService<NotificationTemplate, String> implements NotificationTemplateService {

    private final NotificationTemplateRepository templateRepository;

    public NotificationTemplateServiceImpl(NotificationTemplateRepository templateRepository) {
        super("NotificationTemplate", templateRepository);
        this.templateRepository = templateRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(NotificationTemplate source, NotificationTemplate target) {
        target.setCode(source.getCode());
        target.setTitleTemplate(source.getTitleTemplate());
        target.setBodyTemplate(source.getBodyTemplate());
        target.setMedium(source.getMedium());
        target.setIsActive(source.getIsActive());
    }

    @Override
    public Optional<NotificationTemplate> getByCode(String code) {
        return templateRepository.findByCode(code);
    }
}
