package com.capscrum.school.erp.dataaccessor.aspect;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//Target is METHOD because we want to apply this annotation to methods
@Target(ElementType.METHOD)
// Retention is RUNTIME because we want to access this annotation at runtime in our aspect
@Retention(RetentionPolicy.RUNTIME)
public @interface LogPerformance {
}
