package com.capscrum.school.erp.dataaccessor.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "homework_submissions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"homework_id", "student_id"})
})
public class HomeworkSubmission extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "homework_id", nullable = false)
    private Homework homework;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private LocalDateTime submittedAt;

    private String fileUrl;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(precision = 6, scale = 2)
    private BigDecimal marksObtained;

    @ManyToOne
    @JoinColumn(name = "graded_by")
    private User gradedBy;

    private LocalDateTime gradedAt;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, SUBMITTED, GRADED
}
