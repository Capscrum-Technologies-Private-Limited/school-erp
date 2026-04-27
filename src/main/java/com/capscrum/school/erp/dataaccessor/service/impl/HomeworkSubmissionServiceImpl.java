package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.HomeworkSubmission;
import com.capscrum.school.erp.dataaccessor.repository.HomeworkSubmissionRepository;
import com.capscrum.school.erp.dataaccessor.service.HomeworkSubmissionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HomeworkSubmissionServiceImpl extends AbstractCrudService<HomeworkSubmission, String> implements HomeworkSubmissionService {

    private final HomeworkSubmissionRepository submissionRepository;

    public HomeworkSubmissionServiceImpl(HomeworkSubmissionRepository submissionRepository) {
        super("HomeworkSubmission", submissionRepository);
        this.submissionRepository = submissionRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(HomeworkSubmission source, HomeworkSubmission target) {
        target.setSubmittedAt(source.getSubmittedAt());
        target.setFileUrl(source.getFileUrl());
        target.setRemarks(source.getRemarks());
        target.setMarksObtained(source.getMarksObtained());
        target.setGradedBy(source.getGradedBy());
        target.setGradedAt(source.getGradedAt());
        target.setStatus(source.getStatus());
    }

    @Override
    public Optional<HomeworkSubmission> getByHomeworkAndStudent(String homeworkId, String studentId) {
        return submissionRepository.findByHomeworkIdAndStudentId(homeworkId, studentId);
    }

    @Override
    public List<HomeworkSubmission> getByHomework(String homeworkId) {
        return submissionRepository.findByHomeworkId(homeworkId);
    }

    @Override
    public List<HomeworkSubmission> getByStudent(String studentId) {
        return submissionRepository.findByStudentId(studentId);
    }

    @Override
    public List<HomeworkSubmission> getByParent(String parentId) {
        return submissionRepository.findByParentId(parentId);
    }
}
