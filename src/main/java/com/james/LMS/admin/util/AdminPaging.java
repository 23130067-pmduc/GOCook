package com.james.LMS.admin.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class AdminPaging {

  public static final int DEFAULT_PAGE_SIZE = 10;
  public static final int MAX_PAGE_SIZE = 50;

  private AdminPaging() {}

  public static Pageable of(int page, int size) {
    return of(page, size, Sort.unsorted());
  }

  public static Pageable of(int page, int size, Sort sort) {
    int safePage = Math.max(page, 0);
    int safeSize = size <= 0 ? DEFAULT_PAGE_SIZE : Math.min(size, MAX_PAGE_SIZE);
    Sort safeSort = sort == null ? Sort.unsorted() : sort;
    return PageRequest.of(safePage, safeSize, safeSort);
  }
}
