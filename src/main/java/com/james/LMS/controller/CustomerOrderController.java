package com.james.LMS.controller;

import com.james.LMS.config.SecurityUserDetails;
import com.james.LMS.response.CustomerOrderResponse;
import com.james.LMS.response.CustomerOrdersPageResponse;
import com.james.LMS.service.CustomerOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer/orders")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class CustomerOrderController {
  private final CustomerOrderService service;

  @GetMapping
  public CustomerOrdersPageResponse list(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    return service.list(actor.getId(), status, page, size);
  }

  @GetMapping("/{id}")
  public CustomerOrderResponse detail(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @PathVariable Long id) {
    return service.get(actor.getId(), id);
  }
}
