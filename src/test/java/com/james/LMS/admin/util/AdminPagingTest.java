package com.james.LMS.admin.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;

class AdminPagingTest {

  @Test
  void shouldNormalizeInvalidPagingValues() {
    var pageable = AdminPaging.of(-5, 0);

    assertEquals(0, pageable.getPageNumber());
    assertEquals(AdminPaging.DEFAULT_PAGE_SIZE, pageable.getPageSize());
  }

  @Test
  void shouldCapPageSize() {
    var pageable = AdminPaging.of(2, 999);

    assertEquals(2, pageable.getPageNumber());
    assertEquals(AdminPaging.MAX_PAGE_SIZE, pageable.getPageSize());
  }

  @Test
  void shouldApplySortWhenProvided() {
    var pageable =
        AdminPaging.of(
            0,
            10,
            Sort.by(Sort.Direction.DESC, "scheduledAt"));

    var scheduledAt = pageable.getSort().getOrderFor("scheduledAt");
    assertTrue(scheduledAt != null && scheduledAt.isDescending());
  }
}
