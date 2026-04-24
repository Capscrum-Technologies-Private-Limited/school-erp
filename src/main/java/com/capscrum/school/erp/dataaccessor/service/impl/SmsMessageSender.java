package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.service.MessageSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Placeholder SMS sender. Logs the message instead of actually sending.
 * Replace with a real SMS provider (Twilio, AWS SNS, etc.) when ready.
 */
@Component
public class SmsMessageSender implements MessageSender {

    private static final Logger log = LoggerFactory.getLogger(SmsMessageSender.class);

    @Override
    public boolean send(String to, String subject, String body) {
        // TODO: Integrate with actual SMS provider (Twilio, AWS SNS, etc.)
        log.info("[SMS STUB] Would send SMS to {}: {}", to, body);
        return true;
    }

    @Override
    public String getChannel() {
        return "SMS";
    }
}
