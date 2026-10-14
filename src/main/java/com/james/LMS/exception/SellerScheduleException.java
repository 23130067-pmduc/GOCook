package com.james.LMS.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SellerScheduleException extends RuntimeException {
  private final HttpStatus status;

  public SellerScheduleException(HttpStatus status, String message) {
    super(message);
    this.status = status;
  }
}
