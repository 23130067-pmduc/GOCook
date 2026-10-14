package com.james.LMS.request;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record SellerScheduleRequest(
    @NotNull LocalDate serviceDate,
    @NotNull LocalTime startTime,
    @NotNull LocalTime endTime,
    @NotNull Boolean available) {}
