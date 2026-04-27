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

import java.time.LocalDate;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "admission_enquiries")
public class AdmissionEnquiry extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(unique = true, nullable = false)
    private String enquiryCode;

    @Column(nullable = false)
    private String applicantName;

    private String parentName;

    @Column(nullable = false)
    private String phone;

    private String email;

    private String classApplyingFor;

    @Column(nullable = false)
    private LocalDate enquiryDate = LocalDate.now();

    private String source; // WALK_IN, ONLINE, REFERRAL

    @Column(nullable = false)
    private String status = "NEW"; // NEW, CONTACTED, CONVERTED, DROPPED

    @Column(columnDefinition = "TEXT")
    private String notes;
}
