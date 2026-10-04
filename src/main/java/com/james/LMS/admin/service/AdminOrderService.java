package com.james.LMS.admin.service;

import com.james.LMS.admin.entity.AdminOrder;
import com.james.LMS.admin.enums.AdminOrderStatus;
import com.james.LMS.admin.repository.AdminOrderRepository;
import com.james.LMS.admin.util.AdminPaging;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminOrderService {

  private final AdminOrderRepository orderRepository;

  @Transactional(readOnly = true)
  public Page<AdminOrder> search(
      String query,
      String status,
      LocalDate from,
      LocalDate to,
      int page,
      int size) {
    if (from != null && to != null && from.isAfter(to)) {
      throw new IllegalArgumentException("Ngày bắt đầu không thể sau ngày kết thúc.");
    }

    LocalDateTime fromDate = from == null ? null : from.atStartOfDay();
    LocalDateTime toExclusive = to == null ? null : to.plusDays(1).atStartOfDay();

    return orderRepository.search(
        normalize(query),
        parseStatus(status),
        fromDate,
        toExclusive,
        AdminPaging.of(page, size));
  }

  @Transactional(readOnly = true)
  public AdminOrder get(Long id) {
    return orderRepository
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đơn hàng."));
  }

  @Transactional(readOnly = true)
  public List<AdminOrderStatus> allowedStatuses(Long id) {
    AdminOrder order = get(id);
    return order.getStatus().allowedTargets();
  }

  @Transactional
  public void update(Long id, AdminOrderStatus status, String internalNote) {
    AdminOrder order = get(id);
    if (status == null || !order.getStatus().canTransitionTo(status)) {
      throw new IllegalArgumentException(
          "Không thể chuyển đơn từ “"
              + order.getStatus().getLabel()
              + "” sang trạng thái đã chọn.");
    }
    order.setStatus(status);
    order.setInternalNote(cleanOptional(internalNote));
    orderRepository.save(order);
  }

  public AdminOrderStatus[] statuses() {
    return AdminOrderStatus.values();
  }

  private AdminOrderStatus parseStatus(String status) {
    if (status == null || status.isBlank()) {
      return null;
    }
    try {
      return AdminOrderStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));
    } catch (IllegalArgumentException ignored) {
      return null;
    }
  }

  private String normalize(String value) {
    return value == null ? "" : value.trim();
  }

  private String cleanOptional(String value) {
    return value == null || value.isBlank() ? null : value.trim();
  }
}
