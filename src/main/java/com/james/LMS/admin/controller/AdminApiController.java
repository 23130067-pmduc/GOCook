package com.james.LMS.admin.controller;

import com.james.LMS.admin.dto.AdminUserView;
import com.james.LMS.admin.entity.AdminOrder;
import com.james.LMS.admin.entity.AdminProduct;
import com.james.LMS.admin.enums.AdminOrderStatus;
import com.james.LMS.admin.enums.AdminProductStatus;
import com.james.LMS.admin.service.AdminDashboardService;
import com.james.LMS.admin.service.AdminOrderService;
import com.james.LMS.admin.service.AdminProductService;
import com.james.LMS.admin.service.AdminUserService;
import com.james.LMS.config.SecurityUserDetails;
import com.james.LMS.enums.RoleEnum;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminApiController {

  private final AdminDashboardService dashboardService;
  private final AdminUserService userService;
  private final AdminProductService productService;
  private final AdminOrderService orderService;

  @GetMapping("/dashboard")
  public Map<String, Object> dashboard() {
    return Map.of(
        "userCount", dashboardService.countUsers(),
        "productCount", dashboardService.countPublishedProducts(),
        "orderCount", dashboardService.countOrders(),
        "completedRevenue", dashboardService.completedRevenue(),
        "recentOrders", dashboardService.recentOrders());
  }

  @GetMapping("/users")
  public Map<String, Object> users(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String role,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<AdminUserView> result = userService.search(q, role, status, page, size);
    return pagePayload(result, Map.of("roles", userService.roles()));
  }

  @GetMapping("/users/{id}")
  public Map<String, Object> user(@PathVariable Long id) {
    try {
      return Map.of("user", userService.get(id), "roles", userService.roles());
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @PutMapping("/users/{id}")
  public Map<String, Object> updateUser(
      @PathVariable Long id,
      @RequestBody UpdateUserRequest request,
      @AuthenticationPrincipal SecurityUserDetails currentUser) {
    try {
      userService.update(id, request.username(), request.role(), request.active(), currentUser.getId());
      return Map.of("message", "Đã cập nhật người dùng.", "user", userService.get(id));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @PatchMapping("/users/{id}/toggle")
  public Map<String, Object> toggleUser(
      @PathVariable Long id,
      @AuthenticationPrincipal SecurityUserDetails currentUser) {
    try {
      userService.toggle(id, currentUser.getId());
      return Map.of("message", "Đã cập nhật trạng thái tài khoản.", "user", userService.get(id));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @GetMapping("/products")
  public Map<String, Object> products(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String category,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<AdminProduct> result = productService.search(q, category, status, page, size);
    return pagePayload(
        result,
        Map.of("categories", productService.categories(), "statuses", productService.statuses()));
  }

  @GetMapping("/products/options")
  public Map<String, Object> productOptions() {
    return Map.of("categories", productService.categories(), "statuses", productService.statuses());
  }

  @GetMapping("/products/{id}")
  public Map<String, Object> product(@PathVariable Long id) {
    try {
      return Map.of(
          "product", productService.get(id),
          "categories", productService.categories(),
          "statuses", productService.statuses());
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @PostMapping("/products")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> createProduct(@RequestBody ProductRequest request) {
    try {
      AdminProduct product = productService.create(
          request.name(), request.category(), request.unitPrice(), request.minGuests(),
          request.maxGuests(), request.dishItems(), request.description(), request.imageUrl(),
          request.status());
      return Map.of("message", "Đã thêm thực đơn mới.", "product", product);
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @PutMapping("/products/{id}")
  public Map<String, Object> updateProduct(
      @PathVariable Long id, @RequestBody ProductRequest request) {
    try {
      productService.update(
          id, request.name(), request.category(), request.unitPrice(), request.minGuests(),
          request.maxGuests(), request.dishItems(), request.description(), request.imageUrl(),
          request.status());
      return Map.of("message", "Đã cập nhật thực đơn.", "product", productService.get(id));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @PatchMapping("/products/{id}/toggle")
  public Map<String, Object> toggleProduct(@PathVariable Long id) {
    try {
      productService.toggleVisibility(id);
      return Map.of("message", "Đã cập nhật trạng thái hiển thị.", "product", productService.get(id));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @GetMapping("/orders")
  public Map<String, Object> orders(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    try {
      Page<AdminOrder> result = orderService.search(q, status, from, to, page, size);
      return pagePayload(result, Map.of("statuses", orderService.statuses()));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @GetMapping("/orders/{id}")
  public Map<String, Object> order(@PathVariable Long id) {
    try {
      return Map.of(
          "order", orderService.get(id),
          "allowedStatuses", orderService.allowedStatuses(id));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @PutMapping("/orders/{id}")
  public Map<String, Object> updateOrder(
      @PathVariable Long id, @RequestBody UpdateOrderRequest request) {
    try {
      orderService.update(id, request.status(), request.internalNote());
      return Map.of(
          "message", "Đã cập nhật đơn hàng.",
          "order", orderService.get(id),
          "allowedStatuses", orderService.allowedStatuses(id));
    } catch (IllegalArgumentException ex) {
      throw badRequest(ex);
    }
  }

  @GetMapping("/statistics")
  public Map<String, Object> statistics(
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
    LocalDate effectiveTo = to == null ? LocalDate.now() : to;
    LocalDate effectiveFrom = from == null ? effectiveTo.minusMonths(5).withDayOfMonth(1) : from;
    if (effectiveFrom.isAfter(effectiveTo)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ngày bắt đầu không thể sau ngày kết thúc.");
    }

    List<AdminOrder> orders = orderService.findForStatistics(effectiveFrom, effectiveTo);
    BigDecimal revenue = orders.stream()
        .filter(o -> o.getStatus() == AdminOrderStatus.COMPLETED)
        .map(AdminOrder::getTotalAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    Map<YearMonth, BigDecimal> revenueByMonth = new LinkedHashMap<>();
    YearMonth cursor = YearMonth.from(effectiveFrom);
    YearMonth end = YearMonth.from(effectiveTo);
    while (!cursor.isAfter(end)) {
      revenueByMonth.put(cursor, BigDecimal.ZERO);
      cursor = cursor.plusMonths(1);
    }
    orders.stream()
        .filter(o -> o.getStatus() == AdminOrderStatus.COMPLETED && o.getScheduledAt() != null)
        .forEach(o -> {
          YearMonth month = YearMonth.from(o.getScheduledAt());
          if (revenueByMonth.containsKey(month)) {
            revenueByMonth.put(month, revenueByMonth.get(month).add(o.getTotalAmount()));
          }
        });

    List<Map<String, Object>> monthly = new ArrayList<>();
    DateTimeFormatter label = DateTimeFormatter.ofPattern("MM/yyyy");
    revenueByMonth.forEach((month, value) -> monthly.add(Map.of(
        "month", month.toString(), "label", month.format(label), "revenue", value)));

    Map<String, Long> statusCounts = new LinkedHashMap<>();
    for (AdminOrderStatus status : AdminOrderStatus.values()) {
      statusCounts.put(status.name(), orders.stream().filter(o -> o.getStatus() == status).count());
    }

    return Map.of(
        "from", effectiveFrom,
        "to", effectiveTo,
        "revenue", revenue,
        "orderCount", orders.size(),
        "chefCount", dashboardService.countActiveChefs(),
        "userCount", dashboardService.countUsers(),
        "monthlyRevenue", monthly,
        "statusCounts", statusCounts);
  }

  private Map<String, Object> pagePayload(Page<?> page, Map<String, Object> extras) {
    Map<String, Object> payload = new LinkedHashMap<>();
    payload.put("content", page.getContent());
    payload.put("number", page.getNumber());
    payload.put("size", page.getSize());
    payload.put("numberOfElements", page.getNumberOfElements());
    payload.put("totalElements", page.getTotalElements());
    payload.put("totalPages", page.getTotalPages());
    payload.put("first", page.isFirst());
    payload.put("last", page.isLast());
    payload.putAll(extras);
    return payload;
  }

  private ResponseStatusException badRequest(IllegalArgumentException ex) {
    return new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
  }

  public record UpdateUserRequest(String username, RoleEnum role, boolean active) {}

  public record ProductRequest(
      String name,
      String category,
      BigDecimal unitPrice,
      Integer minGuests,
      Integer maxGuests,
      String dishItems,
      String description,
      String imageUrl,
      AdminProductStatus status) {}

  public record UpdateOrderRequest(AdminOrderStatus status, String internalNote) {}
}
