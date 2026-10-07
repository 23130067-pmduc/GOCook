package com.james.LMS.util;

import java.security.SecureRandom;

public final class OTPGeneratorUtil {
  private static final SecureRandom SECURE_RANDOM = new SecureRandom();

  private OTPGeneratorUtil() {}

  public static String generaRandomCode() {
    return String.format("%06d", SECURE_RANDOM.nextInt(1_000_000));
  }
}
