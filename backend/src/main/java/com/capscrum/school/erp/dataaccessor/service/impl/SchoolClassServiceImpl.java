package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.SchoolClass;
import com.capscrum.school.erp.dataaccessor.repository.SchoolClassRepository;
import com.capscrum.school.erp.dataaccessor.service.SchoolClassService;
import org.springframework.stereotype.Service;

@Service
public class SchoolClassServiceImpl extends AbstractCrudService<SchoolClass, String> implements SchoolClassService {

    public SchoolClassServiceImpl(SchoolClassRepository repository) {
        super("SchoolClass", repository);
    }

    @Override
    protected void copyPropertiesOnUpdate(SchoolClass source, SchoolClass target) {
        target.setGrade(source.getGrade());
        target.setSection(source.getSection());
        target.setRoomNumber(source.getRoomNumber());
        target.setCapacity(source.getCapacity());
        target.setAcademicYear(source.getAcademicYear());
        // school and classCode typically do not change
    }
}
