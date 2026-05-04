package com.capscrum.school.erp.dataaccessor.model;

import com.capscrum.school.erp.dataaccessor.constant.AdmissionStatus;
import com.capscrum.school.erp.dataaccessor.constant.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "admissions")
public class Admission extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "admission_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(unique = true, nullable = false)
    private String admissionCode;

    @ManyToOne
    @JoinColumn(name = "enquiry_id")
    private AdmissionEnquiry enquiry;

    @Column(nullable = false)
    private String applicantName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private String gradeApplyingFor;

    private String academicYearId;

    @Column(nullable = false)
    private String parentName;

    @Column(nullable = false)
    private String parentPhone;

    private String parentEmail;

    private String previousSchool;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdmissionStatus status = AdmissionStatus.PENDING; // PENDING, UNDER_REVIEW, APPROVED, REJECTED, WAITLISTED

    private String rejectionReason;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
