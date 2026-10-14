package com.james.LMS.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.james.LMS.entity.SellerSchedule;
import com.james.LMS.entity.User;
import com.james.LMS.exception.SellerScheduleException;
import com.james.LMS.repository.SellerScheduleRepository;
import com.james.LMS.repository.UserRepository;
import com.james.LMS.request.SellerScheduleRequest;
import com.james.LMS.request.SellerScheduleStatusRequest;
import com.james.LMS.service.impl.SellerScheduleServiceImpl;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

class SellerScheduleTimeTest {
  final SellerScheduleRepository schedules = mock(SellerScheduleRepository.class);
  final UserRepository users = mock(UserRepository.class);
  final JdbcTemplate jdbc = mock(JdbcTemplate.class);
  final SellerScheduleService service = new SellerScheduleServiceImpl(schedules, users, jdbc);
  final ZoneId vietnam = ZoneId.of("Asia/Ho_Chi_Minh");

  SellerScheduleRequest request(LocalDate day, String start, boolean available) {
    return new SellerScheduleRequest(day, LocalTime.parse(start), LocalTime.of(23, 59), available);
  }

  @Test
  void rejectsPastAndExactStartButAllowsFutureUsingVietnamClock() {
    when(users.lockScheduleOwner(1L)).thenReturn(Optional.of(new User()));
    when(schedules.list(any(), any(), any())).thenReturn(List.of());
    when(schedules.saveAndFlush(any())).thenAnswer(call -> call.getArgument(0));
    var now = LocalDateTime.of(2026, 10, 14, 15, 0);
    try (var time = mockStatic(LocalDateTime.class, CALLS_REAL_METHODS)) {
      time.when(() -> LocalDateTime.now(vietnam)).thenReturn(now);
      for (boolean available : new boolean[] {true, false}) {
        assertThatThrownBy(
                () ->
                    service.create(1L, request(now.toLocalDate().minusDays(1), "16:00", available)))
            .isInstanceOf(SellerScheduleException.class)
            .hasMessageContaining("sau thời điểm hiện tại");
        assertThatThrownBy(() -> service.create(1L, request(now.toLocalDate(), "14:59", available)))
            .isInstanceOf(SellerScheduleException.class);
        assertThatThrownBy(() -> service.create(1L, request(now.toLocalDate(), "15:00", available)))
            .isInstanceOf(SellerScheduleException.class);
      }
      verify(schedules, never()).saveAndFlush(any());
      service.create(1L, request(now.toLocalDate(), "15:01", true));
      service.create(1L, request(now.toLocalDate().plusDays(1), "00:00", true));
      verify(schedules, times(2)).saveAndFlush(any());
    }
  }

  @Test
  void existingStartedSlotCannotBeReopenedClosedOrDeleted() {
    when(users.lockScheduleOwner(1L)).thenReturn(Optional.of(new User()));
    var slot = new SellerSchedule();
    slot.setServiceDate(LocalDate.of(2026, 10, 14));
    slot.setStartTime(LocalTime.of(9, 0));
    when(schedules.owned(1L, 2L)).thenReturn(Optional.of(slot));
    var now = LocalDateTime.of(2026, 10, 14, 15, 0);
    try (var time = mockStatic(LocalDateTime.class, CALLS_REAL_METHODS)) {
      time.when(() -> LocalDateTime.now(vietnam)).thenReturn(now);
      assertThatThrownBy(() -> service.status(1L, 2L, new SellerScheduleStatusRequest(true, 0L)))
          .isInstanceOf(SellerScheduleException.class);
      assertThatThrownBy(() -> service.status(1L, 2L, new SellerScheduleStatusRequest(false, 0L)))
          .isInstanceOf(SellerScheduleException.class);
      assertThatThrownBy(() -> service.delete(1L, 2L, 0L))
          .isInstanceOf(SellerScheduleException.class);
      verify(schedules, never()).saveAndFlush(any());
    }
  }
}
