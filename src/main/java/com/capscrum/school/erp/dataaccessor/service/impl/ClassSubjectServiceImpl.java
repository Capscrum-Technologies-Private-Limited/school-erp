package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.ClassSubject;
import com.capscrum.school.erp.dataaccessor.repository.ClassSubjectRepository;
import com.capscrum.school.erp.dataaccessor.service.ClassSubjectService;
import org.springframework.stereotype.Service;

@Service
public class ClassSubjectServiceImpl extends AbstractCrudService<ClassSubject, String> implements ClassSubjectService {

    public ClassSubjectServiceImpl(ClassSubjectRepository repository) {
        super("ClassSubject", repository);
    }

    @Override
    protected void copyPropertiesOnUpdate(ClassSubject source, ClassSubject target) {
        target.setSchoolClass(source.getSchoolClass());
        target.setSubject(source.getSubject());
    }
}
