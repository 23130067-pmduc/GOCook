package com.james.LMS.enums;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class OrderStatusTest {

  @Test
  void shouldAllowExpectedOrderTransitions() {
    assertTrue(OrderStatus.PENDING.canTransitionTo(OrderStatus.CONFIRMED));
    assertTrue(OrderStatus.PENDING.canTransitionTo(OrderStatus.CANCELLED));
    assertTrue(OrderStatus.CONFIRMED.canTransitionTo(OrderStatus.COOKING));
    assertTrue(OrderStatus.COOKING.canTransitionTo(OrderStatus.COMPLETED));
  }

  @Test
  void shouldRejectInvalidOrderTransitions() {
    assertFalse(OrderStatus.PENDING.canTransitionTo(OrderStatus.COMPLETED));
    assertFalse(OrderStatus.COMPLETED.canTransitionTo(OrderStatus.PENDING));
    assertFalse(OrderStatus.CANCELLED.canTransitionTo(OrderStatus.CONFIRMED));
  }
}
