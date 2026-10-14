package com.james.LMS.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SellerProductException extends RuntimeException {
  private final HttpStatus status;
  private final String code;

  public SellerProductException(HttpStatus status, String code, String message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
