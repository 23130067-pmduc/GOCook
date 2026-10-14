package com.james.LMS.interceptor;

import com.james.LMS.controller.SellerScheduleController;
import com.james.LMS.exception.SellerScheduleException;
import jakarta.validation.ConstraintViolationException;
import java.util.Map;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice(assignableTypes = SellerScheduleController.class)
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SellerScheduleExceptionHandler {
  @ExceptionHandler(SellerScheduleException.class)
  public ResponseEntity<?> schedule(SellerScheduleException ex) {
    return body(ex.getStatus(), ex.getMessage());
  }

  @ExceptionHandler({
    MethodArgumentNotValidException.class,
    HttpMessageNotReadableException.class,
    MethodArgumentTypeMismatchException.class,
    MissingServletRequestParameterException.class,
    ConstraintViolationException.class
  })
  public ResponseEntity<?> validation(Exception ex) {
    return body(HttpStatus.BAD_REQUEST, "Ngày, giờ hoặc phiên bản lịch không hợp lệ.");
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<?> conflict(DataIntegrityViolationException ex) {
    return body(HttpStatus.CONFLICT, "Lịch bị trùng hoặc đã thay đổi. Hãy tải lại rồi thử tiếp.");
  }

  private ResponseEntity<?> body(HttpStatus status, String message) {
    return ResponseEntity.status(status).body(Map.of("success", false, "message", message));
  }
}
