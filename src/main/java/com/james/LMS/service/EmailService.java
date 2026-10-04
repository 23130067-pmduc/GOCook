package com.james.LMS.service;

import com.james.LMS.dto.MessageMailDTO;

public interface EmailService {
  void send(MessageMailDTO messageMailDTO);
}
