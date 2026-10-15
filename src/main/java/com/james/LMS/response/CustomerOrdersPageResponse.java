package com.james.LMS.response;

import java.util.List;
import org.springframework.data.domain.Page;

/** Stable paging format matching the React PageResponse interface. */
public record CustomerOrdersPageResponse(
    List<CustomerOrderResponse> content,
    int number,
    int size,
    int numberOfElements,
    long totalElements,
    int totalPages,
    boolean first,
    boolean last) {

  public static CustomerOrdersPageResponse from(Page<CustomerOrderResponse> page) {
    return new CustomerOrdersPageResponse(
        page.getContent(), page.getNumber(), page.getSize(),
        page.getNumberOfElements(), page.getTotalElements(),
        page.getTotalPages(), page.isFirst(), page.isLast());
  }
}
