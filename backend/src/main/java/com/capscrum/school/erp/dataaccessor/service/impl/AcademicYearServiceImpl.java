package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.AcademicYear;
import com.capscrum.school.erp.dataaccessor.repository.AcademicYearRepository;
import com.capscrum.school.erp.dataaccessor.service.AcademicYearService;
import org.springframework.stereotype.Service;

@Service
public class AcademicYearServiceImpl extends AbstractCrudService<AcademicYear, String> implements AcademicYearService {

    public AcademicYearServiceImpl(AcademicYearRepository repository) {
        super("AcademicYear", repository);
    }

    @Override
    protected void copyPropertiesOnUpdate(AcademicYear source, AcademicYear target) {
        target.setLabel(source.getLabel());
        target.setStartDate(source.getStartDate());
        target.setEndDate(source.getEndDate());
        target.setIsCurrent(source.getIsCurrent());
    }
}
