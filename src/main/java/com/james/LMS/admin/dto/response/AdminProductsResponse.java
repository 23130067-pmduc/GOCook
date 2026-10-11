package com.james.LMS.admin.dto.response;

import com.james.LMS.entity.Product;
import com.james.LMS.enums.ProductStatus;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminProductsResponse(
    List<Product> content,
    int number,
    int size,
    int numberOfElements,
    long totalElements,
    int totalPages,
    boolean first,
    boolean last,
    List<String> categories,
    ProductStatus[] statuses) {

  public static AdminProductsResponse from(
      Page<Product> page, List<String> categories, ProductStatus[] statuses) {
    return new AdminProductsResponse(
        page.getContent(), page.getNumber(), page.getSize(), page.getNumberOfElements(),
        page.getTotalElements(), page.getTotalPages(), page.isFirst(), page.isLast(), categories, statuses);
  }
}
