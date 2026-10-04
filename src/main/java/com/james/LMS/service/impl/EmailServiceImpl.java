package com.james.LMS.service.impl;

import com.james.LMS.dto.MessageMailDTO;
import com.james.LMS.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
  private final JavaMailSender mailSender;

  @Value("${spring.mail.username:}")
  private String mailUsername;

  @Override
  public void send(MessageMailDTO messageMailDTO) {
    if (mailUsername == null || mailUsername.isBlank()) {
      log.warn(
          "MAIL_USERNAME is empty. Skip sending email to {}. Configure MAIL_USERNAME and MAIL_PASSWORD in .env to enable mail.",
          messageMailDTO.getTo());
      return;
    }

    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

      helper.setTo(messageMailDTO.getTo());
      helper.setSubject(messageMailDTO.getSubject());
      helper.setText(messageMailDTO.getContent(), true);
      helper.setFrom(messageMailDTO.getFrom() != null ? messageMailDTO.getFrom() : mailUsername);

      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      throw new RuntimeException("Failed to send email", e);
    }
  }
}
