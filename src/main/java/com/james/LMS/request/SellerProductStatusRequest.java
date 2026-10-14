package com.james.LMS.request;

import com.james.LMS.enums.ProductStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record SellerProductStatusRequest(
    @NotNull ProductStatus status, @NotNull @PositiveOrZero Long version) {}
