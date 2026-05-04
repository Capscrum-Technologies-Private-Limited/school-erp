package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.Parent;
import com.capscrum.school.erp.dataaccessor.model.StudentParent;

import java.util.List;

public interface ParentService extends CrudService<Parent, String> {
    StudentParent linkStudentToParent(String studentId, String parentId, boolean isPrimaryContact);
    List<StudentParent> getParentsByStudentId(String studentId);
    List<StudentParent> getStudentsByParentId(String parentId);
}
