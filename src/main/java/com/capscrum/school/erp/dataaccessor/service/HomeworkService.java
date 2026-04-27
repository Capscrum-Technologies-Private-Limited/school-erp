package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.Homework;

import java.util.List;
import java.util.Optional;

public interface HomeworkService extends CrudService<Homework, String> {
    Optional<Homework> getByHomeworkCode(String homeworkCode);
    List<Homework> getByClass(String classId);
    List<Homework> getByTeacher(String teacherId);
    List<Homework> getByParent(String parentId);
}
