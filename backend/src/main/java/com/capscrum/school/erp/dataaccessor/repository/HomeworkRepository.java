package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.Homework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, String> {
    Optional<Homework> findByHomeworkCode(String homeworkCode);
    List<Homework> findBySchoolClassId(String classId);
    List<Homework> findByTeacherId(String teacherId);

    @Query("SELECT h FROM Homework h JOIN h.schoolClass c JOIN Student s ON s.schoolClass = c JOIN StudentParent sp ON sp.student = s WHERE sp.parent.id = :parentId")
    List<Homework> findByParentId(String parentId);
}
