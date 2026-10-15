package com.james.LMS.enums;

import java.util.List;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {

    PENDING("Chờ xác nhận", "gold"),
    CONFIRMED("Đã xác nhận", ""),
    PREPARING("Đang chuẩn bị", "gold"),
    COOKING("Đang nấu", "gold"),
    AWAITING_ACCEPTANCE("Chờ nghiệm thu", "gold"),
    COMPLETED("Hoàn thành", "gray"),
    CANCELLED("Đã hủy", "red"),
    REJECTED("Đã từ chối", "red");

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
            case PENDING -> target == CONFIRMED
                    || target == CANCELLED
                    || target == REJECTED;

            case CONFIRMED -> target == PREPARING
                    || target == CANCELLED;

            case PREPARING -> target == COOKING
                    || target == CANCELLED;

            case COOKING -> target == AWAITING_ACCEPTANCE
                    || target == CANCELLED;

            case AWAITING_ACCEPTANCE -> target == COMPLETED
                    || target == CANCELLED;

            case COMPLETED, CANCELLED, REJECTED -> false;
        };
    }

    public List<OrderStatus> allowedTargets() {
        return switch (this) {
            case PENDING -> List.of(
                    PENDING,
                    CONFIRMED,
                    CANCELLED,
                    REJECTED);

            case CONFIRMED -> List.of(
                    CONFIRMED,
                    PREPARING,
                    CANCELLED);

            case PREPARING -> List.of(
                    PREPARING,
                    COOKING,
                    CANCELLED);

            case COOKING -> List.of(
                    COOKING,
                    AWAITING_ACCEPTANCE,
                    CANCELLED);

            case AWAITING_ACCEPTANCE -> List.of(
                    AWAITING_ACCEPTANCE,
                    COMPLETED,
                    CANCELLED);

            case COMPLETED -> List.of(COMPLETED);

            case CANCELLED -> List.of(CANCELLED);

            case REJECTED -> List.of(REJECTED);
        };
    }
}