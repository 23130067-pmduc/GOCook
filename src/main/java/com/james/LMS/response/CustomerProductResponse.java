package com.james.LMS.response;

import com.james.LMS.entity.Product;
import java.math.BigDecimal;

public record CustomerProductResponse(
    Long id,
    String name,
    String category,
    BigDecimal unitPrice,
    Integer minGuests,
    Integer maxGuests,
    String dishItems,
    String description,
    String imageUrl,
    String chefName) {

  public static CustomerProductResponse from(Product product, String chefName) {
    return new CustomerProductResponse(
        product.getId(),
        product.getName(),
        product.getCategory(),
        product.getUnitPrice(),
        product.getMinGuests(),
        product.getMaxGuests(),
        product.getDishItems(),
        product.getDescription(),
        product.getImageUrl(),
        chefName);
  }
}
