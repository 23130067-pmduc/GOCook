package com.james.LMS.admin.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

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
}
