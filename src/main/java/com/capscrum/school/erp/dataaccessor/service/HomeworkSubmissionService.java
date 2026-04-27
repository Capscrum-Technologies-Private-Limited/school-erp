package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.model.HomeworkSubmission;

import java.util.List;
import java.util.Optional;

public interface HomeworkSubmissionService extends CrudService<HomeworkSubmission, String> {
    Optional<HomeworkSubmission> getByHomeworkAndStudent(String homeworkId, String studentId);
    List<HomeworkSubmission> getByHomework(String homeworkId);
    List<HomeworkSubmission> getByStudent(String studentId);
    List<HomeworkSubmission> getByParent(String parentId);
}
