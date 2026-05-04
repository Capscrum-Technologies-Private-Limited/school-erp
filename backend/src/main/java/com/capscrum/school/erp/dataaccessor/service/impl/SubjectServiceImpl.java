package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.Subject;
import com.capscrum.school.erp.dataaccessor.repository.SubjectRepository;
import com.capscrum.school.erp.dataaccessor.service.SubjectService;
import org.springframework.stereotype.Service;

@Service
public class SubjectServiceImpl extends AbstractCrudService<Subject, String> implements SubjectService {

    public SubjectServiceImpl(SubjectRepository repository) {
        super("Subject", repository);
    }

    @Override
    protected void copyPropertiesOnUpdate(Subject source, Subject target) {
        target.setName(source.getName());
        target.setType(source.getType());
        target.setIsElective(source.getIsElective());
        // school and subjectCode typically do not change
    }
}
