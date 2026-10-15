package com.james.LMS.controller;

import com.james.LMS.response.CustomerProductResponse;
import com.james.LMS.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class CustomerProductController {
  private final PaymentService service;

  @GetMapping("/{id}")
  public CustomerProductResponse get(@PathVariable Long id) {
    return service.product(id);
  }
}
