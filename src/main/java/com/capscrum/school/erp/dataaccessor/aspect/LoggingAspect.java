package com.capscrum.school.erp.dataaccessor.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @Around("@annotation(com.capscrum.school.erp.dataaccessor.aspect.LogPerformance)")
    public Object logPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        Signature methodSignature = joinPoint.getSignature();
        Logger log = LoggerFactory.getLogger(methodSignature.getDeclaringType());
        log.info("Enter: {}.{}() with arguments: {}", methodSignature.getDeclaringTypeName(), methodSignature.getName(), joinPoint.getArgs());
        Object result = null;
        long start = System.currentTimeMillis();
        try {
            result = joinPoint.proceed();
        } finally {
            long executionTime = System.currentTimeMillis() - start;

            String resultStr;
            if (result == null) {
                resultStr = "null";
            } else {
                String resultString = result.toString();
                resultStr = resultString.length() > 5_000 ? resultString.substring(0, 5_000) : resultString;
            }
            log.info("Exit: {}.{}() with result: {} and execution time: {} ms", methodSignature.getDeclaringTypeName(), methodSignature.getName(), resultStr, executionTime);
        }
        return result;
    }
}

