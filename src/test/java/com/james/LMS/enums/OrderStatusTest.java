package com.james.LMS.enums;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class OrderStatusTest {

    @Test
    void shouldAllowExpectedOrderTransitions() {
        assertTrue(OrderStatus.PENDING.canTransitionTo(OrderStatus.CONFIRMED));
        assertTrue(OrderStatus.CONFIRMED.canTransitionTo(OrderStatus.PREPARING));
        assertTrue(OrderStatus.PREPARING.canTransitionTo(OrderStatus.COOKING));
        assertTrue(OrderStatus.COOKING.canTransitionTo(OrderStatus.AWAITING_ACCEPTANCE));
        assertTrue(OrderStatus.AWAITING_ACCEPTANCE.canTransitionTo(OrderStatus.COMPLETED));
        assertTrue(OrderStatus.PENDING.canTransitionTo(OrderStatus.REJECTED));
    }

    @Test
    void shouldRejectInvalidOrderTransitions() {
        assertFalse(OrderStatus.PENDING.canTransitionTo(OrderStatus.COMPLETED));
        assertFalse(OrderStatus.COMPLETED.canTransitionTo(OrderStatus.PENDING));
        assertFalse(OrderStatus.CANCELLED.canTransitionTo(OrderStatus.CONFIRMED));
        assertFalse(OrderStatus.REJECTED.canTransitionTo(OrderStatus.CONFIRMED));
    }
}