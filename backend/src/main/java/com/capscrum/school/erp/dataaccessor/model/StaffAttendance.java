package com.capscrum.school.erp.dataaccessor.model;

import com.capscrum.school.erp.dataaccessor.constant.StaffAttendanceStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "staff_attendance", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "date"})
})
public class StaffAttendance extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StaffAttendanceStatus status = StaffAttendanceStatus.PRESENT; // PRESENT, ABSENT, LEAVE, HALF_DAY
}
