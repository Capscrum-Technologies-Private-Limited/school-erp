package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.FeeStructure;

import java.util.List;

public interface FeeStructureService extends CrudService<FeeStructure, String> {
    List<FeeStructure> getBySchoolAndAcademicYear(String schoolId, String academicYearId);
    List<FeeStructure> getActiveBySchool(String schoolId);
}
