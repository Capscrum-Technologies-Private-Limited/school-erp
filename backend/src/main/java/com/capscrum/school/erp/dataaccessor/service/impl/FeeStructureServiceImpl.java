package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.model.FeeStructure;
import com.capscrum.school.erp.dataaccessor.repository.FeeStructureRepository;
import com.capscrum.school.erp.dataaccessor.service.FeeStructureService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeStructureServiceImpl extends AbstractCrudService<FeeStructure, String> implements FeeStructureService {

    private final FeeStructureRepository feeStructureRepository;

    public FeeStructureServiceImpl(FeeStructureRepository feeStructureRepository) {
        super("FeeStructure", feeStructureRepository);
        this.feeStructureRepository = feeStructureRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(FeeStructure source, FeeStructure target) {
        target.setName(source.getName());
        target.setFeeCategory(source.getFeeCategory());
        target.setAmount(source.getAmount());
        target.setFrequency(source.getFrequency());
        target.setApplicableGrades(source.getApplicableGrades());
        target.setDescription(source.getDescription());
        target.setIsActive(source.getIsActive());
        // school and academicYear are not updated after creation
    }

    @Override
    @LogPerformance
    public List<FeeStructure> getBySchoolAndAcademicYear(String schoolId, String academicYearId) {
        return feeStructureRepository.findBySchoolIdAndAcademicYearId(schoolId, academicYearId);
    }

    @Override
    @LogPerformance
    public List<FeeStructure> getActiveBySchool(String schoolId) {
        return feeStructureRepository.findBySchoolIdAndIsActiveTrue(schoolId);
    }
}
