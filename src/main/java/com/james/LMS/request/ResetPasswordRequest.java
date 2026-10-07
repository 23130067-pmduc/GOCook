package com.james.LMS.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {
  @NotBlank private String resetPasswordToken;

  @NotBlank
  @Size(min = 8, message = "Password must be at least 8 characters")
  private String newPassword;

  @NotBlank private String confirmPassword;
}
