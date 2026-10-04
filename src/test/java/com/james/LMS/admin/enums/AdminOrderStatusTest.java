package com.james.LMS.admin.enums;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class AdminOrderStatusTest {

  @Test
  void shouldAllowExpectedOrderTransitions() {
    assertTrue(AdminOrderStatus.PENDING.canTransitionTo(AdminOrderStatus.CONFIRMED));
    assertTrue(AdminOrderStatus.PENDING.canTransitionTo(AdminOrderStatus.CANCELLED));
    assertTrue(AdminOrderStatus.CONFIRMED.canTransitionTo(AdminOrderStatus.COOKING));
    assertTrue(AdminOrderStatus.COOKING.canTransitionTo(AdminOrderStatus.COMPLETED));
  }

  @Test
  void shouldRejectInvalidOrderTransitions() {
    assertFalse(AdminOrderStatus.PENDING.canTransitionTo(AdminOrderStatus.COMPLETED));
    assertFalse(AdminOrderStatus.COMPLETED.canTransitionTo(AdminOrderStatus.PENDING));
    assertFalse(AdminOrderStatus.CANCELLED.canTransitionTo(AdminOrderStatus.CONFIRMED));
  }
}
