package com.james.LMS.request;

import com.james.LMS.enums.ProductStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public record SellerProductRequest(
    @NotBlank @Size(max = 255) String name,
    @NotBlank @Size(max = 100) String category,
    @NotNull @DecimalMin("1") @Digits(integer = 12, fraction = 2) BigDecimal unitPrice,
    @NotNull @Min(1) @Max(100) Integer minGuests,
    @NotNull @Min(1) @Max(100) Integer maxGuests,
    @NotBlank @Size(max = 10000) String dishItems,
    @Size(max = 3000) String description,
    @NotNull ProductStatus status,
    @PositiveOrZero Long version,
    @NotNull @Size(max = 10) List<@NotBlank String> imageKeys,
    @Size(max = 100) String coverKey) {}
