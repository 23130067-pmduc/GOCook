package com.james.LMS.admin.dto.response;

import java.util.List;
import org.springframework.data.domain.Page;

public record AdminPageResponse<T>(
    List<T> content,
    int number,
    int size,
    int numberOfElements,
    long totalElements,
    int totalPages,
    boolean first,
    boolean last) {

  public static <T> AdminPageResponse<T> from(Page<T> page) {
    return new AdminPageResponse<>(
        page.getContent(),
        page.getNumber(),
        page.getSize(),
        page.getNumberOfElements(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.isFirst(),
        page.isLast());
  }
}
