package com.capscrum.school.erp.dataaccessor.repository;

import com.capscrum.school.erp.dataaccessor.model.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, String> {
}
