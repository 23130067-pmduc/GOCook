package com.james.LMS.admin.controller;

import com.james.LMS.admin.dto.request.UpdateOrderRequest;
import com.james.LMS.admin.dto.response.AdminOrdersResponse;
import com.james.LMS.entity.CookOrder;
import com.james.LMS.admin.service.AdminOrderService;
import java.time.LocalDate;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminOrderController {

  private final AdminOrderService orderService;

  @GetMapping
  public AdminOrdersResponse search(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<CookOrder> result = orderService.search(q, status, from, to, page, size);
    return AdminOrdersResponse.from(result, orderService.statuses());
  }

  @GetMapping("/{id}")
  public Map<String, Object> get(@PathVariable Long id) {
    return Map.of("order", orderService.get(id), "allowedStatuses", orderService.allowedStatuses(id));
  }

  @PutMapping("/{id}")
  public Map<String, Object> update(@PathVariable Long id, @RequestBody UpdateOrderRequest request) {
    orderService.update(id, request.status(), request.internalNote());
    return Map.of(
        "message", "Đã cập nhật đơn hàng.",
        "order", orderService.get(id),
        "allowedStatuses", orderService.allowedStatuses(id));
  }
}
