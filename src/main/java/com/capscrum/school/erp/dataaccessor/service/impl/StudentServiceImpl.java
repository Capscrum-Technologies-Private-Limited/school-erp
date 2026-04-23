package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.model.Student;
import com.capscrum.school.erp.dataaccessor.repository.StudentRepository;
import com.capscrum.school.erp.dataaccessor.service.StudentService;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl extends AbstractCrudService<Student, String> implements StudentService {

    public StudentServiceImpl(StudentRepository studentRepository) {
        super("Student", studentRepository);
    }

    @Override
    protected void copyPropertiesOnUpdate(Student source, Student target) {
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setDateOfBirth(source.getDateOfBirth());
        target.setGender(source.getGender());
        target.setBloodGroup(source.getBloodGroup());
        target.setPhotoUrl(source.getPhotoUrl());
        target.setAddress(source.getAddress());
        target.setPreviousSchool(source.getPreviousSchool());
        target.setMedicalNotes(source.getMedicalNotes());
        target.setStatus(source.getStatus());
        // school and studentCode are generally not updated
    }
}
