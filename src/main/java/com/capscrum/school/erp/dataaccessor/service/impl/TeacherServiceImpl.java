package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.Teacher;
import com.capscrum.school.erp.dataaccessor.repository.TeacherRepository;
import com.capscrum.school.erp.dataaccessor.service.TeacherService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherServiceImpl extends AbstractCrudService<Teacher, String> implements TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        super("Teacher", teacherRepository);
        this.teacherRepository = teacherRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(Teacher source, Teacher target) {
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setPhone(source.getPhone());
        target.setEmail(source.getEmail());
        target.setSubjectSpecialization(source.getSubjectSpecialization());
        target.setPhotoUrl(source.getPhotoUrl());
        target.setStatus(source.getStatus());
    }

    @Override
    public Optional<Teacher> getByTeacherCode(String teacherCode) {
        return teacherRepository.findByTeacherCode(teacherCode);
    }

    @Override
    public Optional<Teacher> getByUserId(String userId) {
        return teacherRepository.findByUserId(userId);
    }
}
