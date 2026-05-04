package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.service.MessageSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

//@Component
public class EmailMessageSender implements MessageSender {

    private static final Logger log = LoggerFactory.getLogger(EmailMessageSender.class);

    // private final JavaMailSender mailSender;

    public EmailMessageSender(/*JavaMailSender mailSender*/) {
        // this.mailSender = mailSender;
    }

    @Override
    public boolean send(String to, String subject, String body) {
        log.info("[SIMULATED] Email would be sent to {} with subject: {}", to, subject);
        return true;
        /*
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Email sent successfully to {}", to);
            return true;
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
            return false;
        }
        */
    }

    @Override
    public String getChannel() {
        return "EMAIL";
    }
}
