package com.james.LMS.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.james.LMS.entity.SellerSchedule;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public record SellerScheduleResponse(List<Slot> slots, List<Booking> bookings) {
  public record Slot(
      Long id,
      Long version,
      @JsonFormat(shape = JsonFormat.Shape.STRING) LocalDate serviceDate,
      @JsonFormat(shape = JsonFormat.Shape.STRING) LocalTime startTime,
      @JsonFormat(shape = JsonFormat.Shape.STRING) LocalTime endTime,
      boolean available) {
    public static Slot from(SellerSchedule s) {
      return new Slot(
          s.getId(),
          s.getVersion(),
          s.getServiceDate(),
          s.getStartTime(),
          s.getEndTime(),
          s.isAvailable());
    }
  }

  public record Booking(
      Long id,
      Long orderId,
      @JsonFormat(shape = JsonFormat.Shape.STRING) LocalDateTime startsAt,
      @JsonFormat(shape = JsonFormat.Shape.STRING) LocalDateTime endsAt) {}
}
