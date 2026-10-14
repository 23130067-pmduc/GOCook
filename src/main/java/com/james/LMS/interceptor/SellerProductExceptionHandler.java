package com.james.LMS.interceptor;

import com.james.LMS.controller.SellerProductController;
import com.james.LMS.exception.SellerProductException;
import java.util.Map;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@RestControllerAdvice(assignableTypes = SellerProductController.class)
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SellerProductExceptionHandler {
  @ExceptionHandler(SellerProductException.class)
  public ResponseEntity<?> domain(SellerProductException error) {
    return response(error.getStatus(), error.getCode(), error.getMessage());
  }

  @ExceptionHandler({
    MethodArgumentNotValidException.class,
    HttpMessageNotReadableException.class,
    MissingServletRequestPartException.class,
    MethodArgumentTypeMismatchException.class
  })
  public ResponseEntity<?> validation(Exception error) {
    return response(
        HttpStatus.BAD_REQUEST,
        "MENU_VALIDATION",
        "Dữ liệu thực đơn không hợp lệ. Kiểm tra tên, danh mục, giá, số khách và hình ảnh.");
  }

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<?> size(MaxUploadSizeExceededException error) {
    return response(
        HttpStatus.PAYLOAD_TOO_LARGE,
        "MENU_UPLOAD_SIZE",
        "Mỗi ảnh không quá 5 MB; tổng request không quá 55 MB.");
  }

  @ExceptionHandler(OptimisticLockingFailureException.class)
  public ResponseEntity<?> conflict(OptimisticLockingFailureException error) {
    return response(
        HttpStatus.CONFLICT,
        "MENU_VERSION_CONFLICT",
        "Thực đơn đã thay đổi. Vui lòng tải lại dữ liệu.");
  }

  private ResponseEntity<?> response(HttpStatus status, String code, String message) {
    return ResponseEntity.status(status)
        .body(Map.of("success", false, "errorCode", code, "message", message));
  }
}
