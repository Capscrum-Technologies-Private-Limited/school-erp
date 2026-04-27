package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.Teacher;

import java.util.Optional;

public interface TeacherService extends CrudService<Teacher, String> {
    Optional<Teacher> getByTeacherCode(String teacherCode);
    Optional<Teacher> getByUserId(String userId);
}
