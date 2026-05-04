package com.capscrum.school.erp.dataaccessor.model;

import com.capscrum.school.erp.dataaccessor.constant.Gender;
import com.capscrum.school.erp.dataaccessor.constant.StudentStatus;
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
@Table(name = "students")
public class Student extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;

    @Column(unique = true, nullable = false)
    private String studentCode;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender; // MALE, FEMALE, OTHER

    private String bloodGroup;
    private String photoUrl;
    private String address;
    private String previousSchool;
    private String medicalNotes;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StudentStatus status = StudentStatus.ACTIVE; // ACTIVE, INACTIVE, TRANSFERRED, GRADUATED
}
