package com.james.LMS.admin.dto.request;

import com.james.LMS.enums.ProductStatus;
import java.math.BigDecimal;

public record ProductRequest(
    String name,
    String category,
    BigDecimal unitPrice,
    Integer minGuests,
    Integer maxGuests,
    String dishItems,
    String description,
    String imageUrl,
    ProductStatus status) {}
