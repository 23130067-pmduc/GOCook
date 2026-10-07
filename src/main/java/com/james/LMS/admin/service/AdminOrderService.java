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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

    String normalizedQuery = normalize(query).toLowerCase(Locale.ROOT);
    AdminOrderStatus parsedStatus = parseStatus(status);
    LocalDateTime fromDate = from == null ? null : from.atStartOfDay();
    LocalDateTime toExclusive = to == null ? null : to.plusDays(1).atStartOfDay();

    Specification<AdminOrder> spec = Specification.where(null);

    if (!normalizedQuery.isBlank()) {
      String pattern = "%" + normalizedQuery + "%";
      spec =
          spec.and(
              (root, criteriaQuery, cb) ->
                  cb.or(
                      cb.like(cb.lower(root.get("orderCode")), pattern),
                      cb.like(cb.lower(root.get("customerName")), pattern),
                      cb.like(cb.lower(root.get("customerEmail")), pattern),
                      cb.like(cb.lower(root.get("productName")), pattern),
                      cb.like(cb.lower(root.get("chefName")), pattern)));
    }

    if (parsedStatus != null) {
      spec =
          spec.and(
              (root, criteriaQuery, cb) -> cb.equal(root.get("status"), parsedStatus));
    }

    if (fromDate != null) {
      spec =
          spec.and(
              (root, criteriaQuery, cb) ->
                  cb.greaterThanOrEqualTo(root.get("scheduledAt"), fromDate));
    }

    if (toExclusive != null) {
      spec =
          spec.and(
              (root, criteriaQuery, cb) ->
                  cb.lessThan(root.get("scheduledAt"), toExclusive));
    }

    Pageable pageable =
        AdminPaging.of(
            page,
            size,
            Sort.by(Sort.Direction.DESC, "scheduledAt"));

    return orderRepository.findAll(spec, pageable);
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
