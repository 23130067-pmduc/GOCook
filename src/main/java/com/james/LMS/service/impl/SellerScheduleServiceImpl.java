package com.james.LMS.service.impl;

import com.james.LMS.entity.SellerSchedule;
import com.james.LMS.exception.SellerScheduleException;
import com.james.LMS.repository.SellerScheduleRepository;
import com.james.LMS.repository.UserRepository;
import com.james.LMS.request.SellerScheduleRequest;
import com.james.LMS.request.SellerScheduleStatusRequest;
import com.james.LMS.response.SellerScheduleResponse;
import com.james.LMS.response.SellerScheduleResponse.Slot;
import com.james.LMS.service.SellerScheduleService;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SellerScheduleServiceImpl implements SellerScheduleService {
  private final SellerScheduleRepository schedules;
  private final UserRepository users;
  private final JdbcTemplate jdbc;

  @Override
  @Transactional(readOnly = true)
  public SellerScheduleResponse list(Long chef, LocalDate from, LocalDate to) {
    if (users.findById(chef).filter(u -> u.isActive()).isEmpty())
      throw error(HttpStatus.FORBIDDEN, "Tài khoản không hoạt động.");
    if (from == null
        || to == null
        || to.isBefore(from)
        || ChronoUnit.DAYS.between(from, to) > 92
        || from.getYear() < 2000
        || to.getYear() > 2099)
      throw error(
          HttpStatus.BAD_REQUEST, "Khoảng ngày không hợp lệ (tối đa 93 ngày, năm 2000–2099).");
    var bookings =
        jdbc.query(
            "select id, order_id, starts_at, ends_at from chef_bookings where chef_id=? and"
                + " booking_status='ACTIVE' and starts_at < ? and ends_at > ? order by starts_at",
            (rs, row) ->
                new SellerScheduleResponse.Booking(
                    rs.getLong("id"),
                    rs.getLong("order_id"),
                    rs.getTimestamp("starts_at").toLocalDateTime(),
                    rs.getTimestamp("ends_at").toLocalDateTime()),
            chef,
            Timestamp.valueOf(to.plusDays(1).atStartOfDay()),
            Timestamp.valueOf(from.atStartOfDay()));
    return new SellerScheduleResponse(
        schedules.list(chef, from, to).stream().map(Slot::from).toList(), bookings);
  }

  @Override
  @Transactional
  public Slot create(Long chef, SellerScheduleRequest r) {
    lock(chef);
    if (r.serviceDate() == null
        || r.startTime() == null
        || r.endTime() == null
        || r.available() == null
        || r.serviceDate().getYear() < 2000
        || r.serviceDate().getYear() > 2099
        || !r.startTime().isBefore(r.endTime())
        || r.startTime().getSecond() != 0
        || r.endTime().getSecond() != 0
        || r.startTime().getNano() != 0
        || r.endTime().getNano() != 0)
      throw error(
          HttpStatus.BAD_REQUEST,
          "Chọn ngày và giờ hợp lệ; giờ kết thúc phải sau giờ bắt đầu trong cùng ngày.");
    ensureFuture(r.serviceDate(), r.startTime());
    if (schedules.list(chef, r.serviceDate(), r.serviceDate()).stream()
        .anyMatch(
            s -> s.getStartTime().isBefore(r.endTime()) && s.getEndTime().isAfter(r.startTime())))
      throw error(
          HttpStatus.CONFLICT, "Khung giờ trùng với lịch đã có. Khung giờ liền nhau được phép.");
    if (!r.available())
      ensureNoBooking(
          chef, r.serviceDate().atTime(r.startTime()), r.serviceDate().atTime(r.endTime()));
    // Reuse soft-deleted exact slots: the existing UNIQUE constraint includes inactive rows.
    var slot =
        schedules
            .findBySellerIdAndServiceDateAndStartTimeAndEndTime(
                chef, r.serviceDate(), r.startTime(), r.endTime())
            .orElseGet(SellerSchedule::new);
    slot.setSellerId(chef);
    slot.setServiceDate(r.serviceDate());
    slot.setStartTime(r.startTime());
    slot.setEndTime(r.endTime());
    slot.setAvailable(r.available());
    slot.activate();
    return Slot.from(schedules.saveAndFlush(slot));
  }

  @Override
  @Transactional
  public Slot status(Long chef, Long id, SellerScheduleStatusRequest r) {
    lock(chef);
    var slot = owned(chef, id, r.version());
    ensureFuture(slot.getServiceDate(), slot.getStartTime());
    if (r.available() == null) throw error(HttpStatus.BAD_REQUEST, "Thiếu trạng thái khung giờ.");
    if (!r.available())
      ensureNoBooking(
          chef,
          slot.getServiceDate().atTime(slot.getStartTime()),
          slot.getServiceDate().atTime(slot.getEndTime()));
    slot.setAvailable(r.available());
    slot.touch();
    return Slot.from(schedules.saveAndFlush(slot));
  }

  @Override
  @Transactional
  public void delete(Long chef, Long id, Long version) {
    lock(chef);
    var slot = owned(chef, id, version);
    ensureFuture(slot.getServiceDate(), slot.getStartTime());
    ensureNoBooking(
        chef,
        slot.getServiceDate().atTime(slot.getStartTime()),
        slot.getServiceDate().atTime(slot.getEndTime()));
    slot.deactivate();
    schedules.saveAndFlush(slot);
  }

  private void ensureFuture(LocalDate date, java.time.LocalTime start) {
    if (!date.atTime(start).isAfter(LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"))))
      throw error(
          HttpStatus.BAD_REQUEST,
          "Chỉ được thiết lập lịch có giờ bắt đầu sau thời điểm hiện tại (giờ Việt Nam). Lịch đã"
              + " bắt đầu chỉ được xem.");
  }

  private void lock(Long chef) {
    if (users.lockScheduleOwner(chef).isEmpty())
      throw error(HttpStatus.FORBIDDEN, "Tài khoản không hoạt động.");
  }

  private SellerSchedule owned(Long chef, Long id, Long version) {
    var slot =
        schedules
            .owned(chef, id)
            .orElseThrow(() -> error(HttpStatus.NOT_FOUND, "Không tìm thấy khung giờ."));
    if (!Objects.equals(slot.getVersion(), version))
      throw error(HttpStatus.CONFLICT, "Lịch đã thay đổi. Hãy tải lại rồi thử tiếp.");
    return slot;
  }

  private void ensureNoBooking(Long chef, LocalDateTime start, LocalDateTime end) {
    Integer count =
        jdbc.queryForObject(
            "select count(*) from chef_bookings where chef_id=? and booking_status='ACTIVE' and"
                + " starts_at < ? and ends_at > ?",
            Integer.class,
            chef,
            Timestamp.valueOf(end),
            Timestamp.valueOf(start));
    if (count != null && count > 0)
      throw error(HttpStatus.CONFLICT, "Khung giờ có đơn đã nhận, không thể đóng hoặc xóa.");
  }

  private SellerScheduleException error(HttpStatus status, String message) {
    return new SellerScheduleException(status, message);
  }
}
