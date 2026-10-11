package com.james.LMS.enums;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
  PENDING("Chờ xác nhận", "gold"),
  CONFIRMED("Đã xác nhận", ""),
  COOKING("Đang nấu", "gold"),
  COMPLETED("Hoàn thành", "gray"),
  CANCELLED("Đã hủy", "red");

  private final String label;
  private final String badgeClass;

  public String getValue() {
    return name();
  }

  public boolean canTransitionTo(OrderStatus target) {
    if (target == null || target == this) {
      return true;
    }
    return switch (this) {
      case PENDING -> target == CONFIRMED || target == CANCELLED;
      case CONFIRMED -> target == COOKING || target == CANCELLED;
      case COOKING -> target == COMPLETED || target == CANCELLED;
      case COMPLETED, CANCELLED -> false;
    };
  }

  public List<OrderStatus> allowedTargets() {
    return switch (this) {
      case PENDING -> List.of(PENDING, CONFIRMED, CANCELLED);
      case CONFIRMED -> List.of(CONFIRMED, COOKING, CANCELLED);
      case COOKING -> List.of(COOKING, COMPLETED, CANCELLED);
      case COMPLETED -> List.of(COMPLETED);
      case CANCELLED -> List.of(CANCELLED);
    };
  }
}
