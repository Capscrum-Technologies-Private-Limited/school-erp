package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;
import com.capscrum.school.erp.dataaccessor.exception.ResourceNotFoundException;
import com.capscrum.school.erp.dataaccessor.model.Parent;
import com.capscrum.school.erp.dataaccessor.model.Student;
import com.capscrum.school.erp.dataaccessor.model.StudentParent;
import com.capscrum.school.erp.dataaccessor.repository.ParentRepository;
import com.capscrum.school.erp.dataaccessor.repository.StudentParentRepository;
import com.capscrum.school.erp.dataaccessor.repository.StudentRepository;
import com.capscrum.school.erp.dataaccessor.service.ParentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ParentServiceImpl extends AbstractCrudService<Parent, String> implements ParentService {

    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;
    private final StudentParentRepository studentParentRepository;

    public ParentServiceImpl(ParentRepository parentRepository,
                             StudentRepository studentRepository,
                             StudentParentRepository studentParentRepository) {
        super("Parent", parentRepository);
        this.parentRepository = parentRepository;
        this.studentRepository = studentRepository;
        this.studentParentRepository = studentParentRepository;
    }

    @Override
    protected void copyPropertiesOnUpdate(Parent source, Parent target) {
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setEmail(source.getEmail());
        target.setPhoneNumber(source.getPhoneNumber());
        target.setAddress(source.getAddress());
        target.setOccupation(source.getOccupation());
        target.setRelation(source.getRelation());
    }

    @Override
    @Transactional
    @LogPerformance
    public StudentParent linkStudentToParent(String studentId, String parentId, boolean isPrimaryContact) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student with id " + studentId + " not found"));

        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new ResourceNotFoundException("Parent with id " + parentId + " not found"));

        if (studentParentRepository.existsByStudentIdAndParentId(studentId, parentId)) {
            throw new BadRequestException("Student is already linked to this parent");
        }

        StudentParent studentParent = new StudentParent();
        studentParent.setStudent(student);
        studentParent.setParent(parent);
        studentParent.setIsPrimaryContact(isPrimaryContact);

        return studentParentRepository.save(studentParent);
    }

    @Override
    @LogPerformance
    public List<StudentParent> getParentsByStudentId(String studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new ResourceNotFoundException("Student with id " + studentId + " not found");
        }
        return studentParentRepository.findByStudentId(studentId);
    }

    @Override
    @LogPerformance
    public List<StudentParent> getStudentsByParentId(String parentId) {
        if (!parentRepository.existsById(parentId)) {
            throw new ResourceNotFoundException("Parent with id " + parentId + " not found");
        }
        return studentParentRepository.findByParentId(parentId);
    }
}
