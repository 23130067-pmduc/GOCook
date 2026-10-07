package com.james.LMS.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResetPasswordKey {
  OTP_KEY("RESET_PASSWORD_OTP_%s"),
  TIMEOUT_RETRY_KEY("RESET_PASSWORD_RETRY_%s"),
  RESET_TOKEN_KEY("RESET_PASSWORD_TOKEN_%s");

  private final String content;
}
