package com.capscrum.school.erp.dataaccessor.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DashboardStatsDto {
    // Global Stats (Admin / Finance)
    private Long totalStudents;
    private Long totalTeachers;
    private BigDecimal totalRevenue;
    private Double attendanceRate; // Used globally, or per class/student
    
    // Teacher Specific
    private Integer assignedClassesCount;
    private Long studentsTaughtCount;
    
    // Parent / Student Specific
    private BigDecimal pendingFees;
    
    // Context Info
    private String roleMessage;
}
