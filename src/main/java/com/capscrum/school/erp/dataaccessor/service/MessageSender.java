package com.capscrum.school.erp.dataaccessor.service;

/**
 * Abstraction for sending messages through different channels (Email, SMS).
 * Implementations can be swapped for different providers.
 */
public interface MessageSender {
    /**
     * Send a message to a recipient.
     *
     * @param to      recipient address (email or phone number)
     * @param subject message subject (may be ignored by SMS)
     * @param body    message body
     * @return true if sent successfully, false otherwise
     */
    boolean send(String to, String subject, String body);

    /**
     * The channel this sender supports.
     *
     * @return "EMAIL" or "SMS"
     */
    String getChannel();
}
