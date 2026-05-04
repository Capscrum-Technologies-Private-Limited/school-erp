package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.FeeCategory;
import com.capscrum.school.erp.dataaccessor.repository.FeeCategoryRepository;
import com.capscrum.school.erp.dataaccessor.service.FeeCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeeCategoryServiceImpl extends AbstractCrudService<FeeCategory, String> implements FeeCategoryService {

    private final FeeCategoryRepository feeCategoryRepository;

    public FeeCategoryServiceImpl(FeeCategoryRepository feeCategoryRepository) {
        super("FeeCategory", feeCategoryRepository);
        this.feeCategoryRepository = feeCategoryRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(FeeCategory source, FeeCategory target) {
        target.setName(source.getName());
        target.setDescription(source.getDescription());
    }

    @Override
    public Optional<FeeCategory> getByName(String name, String schoolId) {
        return feeCategoryRepository.findByNameAndSchoolId(name, schoolId);
    }

    @Override
    public List<FeeCategory> getBySchool(String schoolId) {
        return feeCategoryRepository.findBySchoolId(schoolId);
    }
}
