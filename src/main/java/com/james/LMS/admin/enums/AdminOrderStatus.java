package com.james.LMS.admin.enums;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdminOrderStatus {
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

  public boolean canTransitionTo(AdminOrderStatus target) {
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

  public List<AdminOrderStatus> allowedTargets() {
    return switch (this) {
      case PENDING -> List.of(PENDING, CONFIRMED, CANCELLED);
      case CONFIRMED -> List.of(CONFIRMED, COOKING, CANCELLED);
      case COOKING -> List.of(COOKING, COMPLETED, CANCELLED);
      case COMPLETED -> List.of(COMPLETED);
      case CANCELLED -> List.of(CANCELLED);
    };
  }
}
