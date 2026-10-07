package com.james.LMS.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EmailVerificationKey {
  OTP_KEY("EMAIL_VERIFY_OTP_%s"),
  RETRY_KEY("EMAIL_VERIFY_RETRY_%s");

  private final String content;
}
