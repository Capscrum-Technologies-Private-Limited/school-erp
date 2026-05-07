package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.constant.FeeStatus;
import com.capscrum.school.erp.dataaccessor.dto.DashboardStatsDto;
import com.capscrum.school.erp.dataaccessor.model.Fee;
import com.capscrum.school.erp.dataaccessor.model.Parent;
import com.capscrum.school.erp.dataaccessor.model.Student;
import com.capscrum.school.erp.dataaccessor.model.StudentParent;
import com.capscrum.school.erp.dataaccessor.model.Teacher;
import com.capscrum.school.erp.dataaccessor.model.User;
import com.capscrum.school.erp.dataaccessor.repository.*;
import com.capscrum.school.erp.dataaccessor.service.DashboardService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ParentRepository parentRepository;
    private final StudentParentRepository studentParentRepository;
    private final FeeRepository feeRepository;
    private final PaymentRepository paymentRepository;

    public DashboardServiceImpl(UserRepository userRepository,
                                StudentRepository studentRepository,
                                TeacherRepository teacherRepository,
                                ParentRepository parentRepository,
                                StudentParentRepository studentParentRepository,
                                FeeRepository feeRepository,
                                PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.parentRepository = parentRepository;
        this.studentParentRepository = studentParentRepository;
        this.feeRepository = feeRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public DashboardStatsDto getDashboardStats() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isSuperAdmin = user.getRoles().stream().anyMatch(r -> r.getName().equals("SUPER_ADMIN"));
        boolean isAdmin = user.getRoles().stream().anyMatch(r -> r.getName().equals("ADMIN"));
        boolean isFinance = user.getRoles().stream().anyMatch(r -> r.getName().equals("FINANCE_MANAGER"));
        boolean isTeacher = user.getRoles().stream().anyMatch(r -> r.getName().equals("TEACHER"));
        boolean isParent = user.getRoles().stream().anyMatch(r -> r.getName().equals("PARENT"));
        boolean isStudent = user.getRoles().stream().anyMatch(r -> r.getName().equals("STUDENT"));

        DashboardStatsDto.DashboardStatsDtoBuilder builder = DashboardStatsDto.builder();

        if (isSuperAdmin || isAdmin || isFinance) {
            builder.totalStudents(studentRepository.count());
            builder.totalTeachers(teacherRepository.count());
            
            // Calculate total revenue from all fees that are paid or partially paid
            BigDecimal totalRevenue = feeRepository.findAll().stream()
                    .map(Fee::getAmountPaid)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            builder.totalRevenue(totalRevenue);
            builder.attendanceRate(95.0); // Dummy for global rate
            builder.roleMessage("Viewing global school statistics");
        } else if (isTeacher) {
            Teacher teacher = teacherRepository.findByUserId(user.getId()).orElse(null);
            if (teacher != null) {
                builder.assignedClassesCount(3); // Dummy value
                builder.studentsTaughtCount(120L); // Dummy value
            }
            builder.roleMessage("Viewing teacher statistics");
        } else if (isParent) {
            Parent parent = parentRepository.findByUserId(user.getId()).orElse(null);
            BigDecimal totalPending = BigDecimal.ZERO;
            if (parent != null) {
                List<Student> children = studentParentRepository.findByParentId(parent.getId()).stream()
                        .map(StudentParent::getStudent)
                        .collect(Collectors.toList());
                        
                for (Student child : children) {
                    List<Fee> fees = feeRepository.findByStudentIdAndStatus(child.getId(), FeeStatus.PENDING);
                    BigDecimal childPending = fees.stream()
                            .map(f -> f.getAmount().subtract(f.getAmountPaid()))
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    totalPending = totalPending.add(childPending);
                }
            }
            builder.pendingFees(totalPending);
            builder.attendanceRate(98.5); // Dummy value for child
            builder.roleMessage("Viewing your children's statistics");
        } else if (isStudent) {
            Student student = studentRepository.findByUserId(user.getId()).orElse(null);
            if (student != null) {
                List<Fee> fees = feeRepository.findByStudentIdAndStatus(student.getId(), FeeStatus.PENDING);
                BigDecimal totalPending = fees.stream()
                        .map(f -> f.getAmount().subtract(f.getAmountPaid()))
                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                builder.pendingFees(totalPending);
            }
            builder.attendanceRate(96.0); // Dummy value for student
            builder.roleMessage("Viewing your personal statistics");
        }

        return builder.build();
    }
}
