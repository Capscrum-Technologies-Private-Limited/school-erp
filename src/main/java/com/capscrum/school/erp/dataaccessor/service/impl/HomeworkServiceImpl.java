package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.Homework;
import com.capscrum.school.erp.dataaccessor.repository.HomeworkRepository;
import com.capscrum.school.erp.dataaccessor.service.HomeworkService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HomeworkServiceImpl extends AbstractCrudService<Homework, String> implements HomeworkService {

    private final HomeworkRepository homeworkRepository;

    public HomeworkServiceImpl(HomeworkRepository homeworkRepository) {
        super("Homework", homeworkRepository);
        this.homeworkRepository = homeworkRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(Homework source, Homework target) {
        target.setTitle(source.getTitle());
        target.setDescription(source.getDescription());
        target.setDueDate(source.getDueDate());
        target.setMaxMarks(source.getMaxMarks());
        target.setAttachmentUrl(source.getAttachmentUrl());
        target.setStatus(source.getStatus());
    }

    @Override
    public Optional<Homework> getByHomeworkCode(String homeworkCode) {
        return homeworkRepository.findByHomeworkCode(homeworkCode);
    }

    @Override
    public List<Homework> getByClass(String classId) {
        return homeworkRepository.findBySchoolClassId(classId);
    }

    @Override
    public List<Homework> getByTeacher(String teacherId) {
        return homeworkRepository.findByTeacherId(teacherId);
    }

    @Override
    public List<Homework> getByParent(String parentId) {
        return homeworkRepository.findByParentId(parentId);
    }
}
