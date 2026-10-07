package com.james.LMS.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ForgotPasswordResponse {
  @Builder.Default
  private String message = "OTP sent. You can request another code after 60 seconds.";
}
