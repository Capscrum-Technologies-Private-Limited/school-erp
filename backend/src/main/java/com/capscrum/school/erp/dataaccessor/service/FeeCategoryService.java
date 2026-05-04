package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.FeeCategory;

import java.util.List;
import java.util.Optional;

public interface FeeCategoryService extends CrudService<FeeCategory, String> {
    Optional<FeeCategory> getByName(String name, String schoolId);
    List<FeeCategory> getBySchool(String schoolId);
}
