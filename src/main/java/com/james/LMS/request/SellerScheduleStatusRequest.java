package com.james.LMS.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record SellerScheduleStatusRequest(
    @NotNull Boolean available, @NotNull @PositiveOrZero Long version) {}
