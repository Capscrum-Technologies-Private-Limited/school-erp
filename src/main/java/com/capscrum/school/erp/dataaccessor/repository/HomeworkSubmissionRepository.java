package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.HomeworkSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HomeworkSubmissionRepository extends JpaRepository<HomeworkSubmission, String> {
    Optional<HomeworkSubmission> findByHomeworkIdAndStudentId(String homeworkId, String studentId);
    List<HomeworkSubmission> findByHomeworkId(String homeworkId);
    List<HomeworkSubmission> findByStudentId(String studentId);

    @Query("SELECT hs FROM HomeworkSubmission hs JOIN StudentParent sp ON sp.student = hs.student WHERE sp.parent.id = :parentId")
    List<HomeworkSubmission> findByParentId(String parentId);
}
