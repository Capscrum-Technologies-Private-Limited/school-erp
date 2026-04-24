package com.capscrum.school.erp.dataaccessor.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "fee_structures")
public class FeeStructure extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Column(nullable = false)
    private String name; // e.g. "Tuition Fee", "Lab Fee", "Transport Fee"

    @Column(nullable = false)
    private String feeCategory; // TUITION, LAB, TRANSPORT, EXAM, LIBRARY, OTHER

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String frequency; // MONTHLY, QUARTERLY, HALF_YEARLY, ANNUALLY, ONE_TIME

    private String applicableGrades; // comma-separated, e.g. "1,2,3" or "ALL"

    private String description;

    @Column(nullable = false)
    private Boolean isActive = true;
}
