package com.james.LMS.service;

import static org.assertj.core.api.Assertions.*;

import com.james.LMS.entity.User;
import com.james.LMS.exception.SellerScheduleException;
import com.james.LMS.repository.UserRepository;
import com.james.LMS.request.SellerScheduleRequest;
import com.james.LMS.request.SellerScheduleStatusRequest;
import com.james.LMS.service.impl.SellerScheduleServiceImpl;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.transaction.TestTransaction;

@DataJpaTest(
    properties = {
      "spring.datasource.url=${GOCOOK_MENU_TEST_URL}",
      "spring.datasource.username=app_user",
      "spring.datasource.password=${GOCOOK_MENU_TEST_PASSWORD:app_password}",
      "spring.jpa.hibernate.ddl-auto=none",
      "spring.jpa.show-sql=false"
    })
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(SellerScheduleServiceImpl.class)
@EnabledIfEnvironmentVariable(named = "GOCOOK_MENU_TEST_URL", matches = ".+gocook_menu_test_.+")
class SellerSchedulePersistenceTest {
  @Autowired SellerScheduleService service;
  @Autowired UserRepository users;
  @Autowired JdbcTemplate jdbc;
  @Autowired EntityManager entityManager;
  Long chef;
  Long other;
  LocalDate day = LocalDate.of(2027, 1, 5);

  @BeforeEach
  void setup() {
    chef = user();
    other = user();
  }

  Long user() {
    return users
        .saveAndFlush(
            User.builder()
                .username("schedule-test")
                .email(UUID.randomUUID() + "@example.invalid")
                .password("unused")
                .build())
        .getId();
  }

  SellerScheduleRequest request(String start, String end, boolean available) {
    return new SellerScheduleRequest(day, LocalTime.parse(start), LocalTime.parse(end), available);
  }

  @Test
  void persistsAndScopesSlotsAndAllowsAdjacentIntervals() {
    service.create(chef, request("09:00", "12:00", true));
    service.create(chef, request("12:00", "14:00", true));
    service.create(other, request("09:00", "12:00", true));
    assertThat(service.list(chef, day, day).slots()).hasSize(2);
    assertThat(service.list(other, day, day).slots()).hasSize(1);
    assertThatThrownBy(() -> service.create(chef, request("11:59", "13:00", false)))
        .isInstanceOf(SellerScheduleException.class)
        .hasMessageContaining("trùng");
  }

  @Test
  void deleteAndRecreateExactSlotPreservesUniqueConstraintAndVersions() {
    var slot = service.create(chef, request("09:00", "12:00", true));
    service.delete(chef, slot.id(), slot.version());
    assertThat(service.list(chef, day, day).slots()).isEmpty();
    var restored = service.create(chef, request("09:00", "12:00", false));
    assertThat(restored.id()).isEqualTo(slot.id());
    assertThat(restored.version()).isGreaterThan(slot.version());
    assertThat(restored.available()).isFalse();
  }

  @Test
  void rejectsForeignIdsAndStaleVersions() {
    var slot = service.create(chef, request("09:00", "12:00", true));
    assertThatThrownBy(() -> service.delete(other, slot.id(), slot.version()))
        .hasMessageContaining("Không tìm thấy");
    var changed =
        service.status(chef, slot.id(), new SellerScheduleStatusRequest(false, slot.version()));
    assertThat(changed.version()).isGreaterThan(slot.version());
    assertThatThrownBy(() -> service.delete(chef, slot.id(), slot.version()))
        .hasMessageContaining("đã thay đổi");
  }

  @Test
  void rejectsInvalidTimesDatesAndExcessiveReadRange() {
    assertThatThrownBy(() -> service.create(chef, request("12:00", "09:00", true)))
        .hasMessageContaining("hợp lệ");
    assertThatThrownBy(() -> service.create(chef, request("09:00", "09:00", true)))
        .hasMessageContaining("hợp lệ");
    assertThatThrownBy(() -> service.create(chef, request("09:00:01", "12:00", true)))
        .hasMessageContaining("hợp lệ");
    assertThatThrownBy(() -> service.list(chef, day, day.minusDays(1)))
        .hasMessageContaining("Khoảng ngày");
    assertThatThrownBy(() -> service.list(chef, day, day.plusDays(93)))
        .hasMessageContaining("Khoảng ngày");
  }

  void booking(Long owner, String start, String end) {
    Long order =
        jdbc.queryForObject(
            "insert into"
                + " orders(order_code,customer_name,product_name,guest_count,scheduled_at,total_amount,status,chef_id,customer_id)"
                + " values (?, 'test', 'test', 2, '2027-01-05 09:00', 100000,'CONFIRMED',?,?)"
                + " returning id",
            Long.class,
            UUID.randomUUID().toString(),
            owner,
            other);
    jdbc.update(
        "insert into chef_bookings(order_id,chef_id,starts_at,ends_at)"
            + " values(?,?,?::timestamp,?::timestamp)",
        order,
        owner,
        start,
        end);
  }

  @Test
  void protectsActiveBookingsIncludingOvernightAndScopesReads() {
    var slot = service.create(chef, request("00:00", "10:00", true));
    booking(chef, "2027-01-04 23:00", "2027-01-05 09:00");
    booking(other, "2027-01-05 10:00", "2027-01-05 11:00");
    assertThat(service.list(chef, day, day).bookings()).hasSize(1);
    assertThatThrownBy(() -> service.delete(chef, slot.id(), slot.version()))
        .hasMessageContaining("đơn đã nhận");
    assertThatThrownBy(
            () ->
                service.status(
                    chef, slot.id(), new SellerScheduleStatusRequest(false, slot.version())))
        .hasMessageContaining("đơn đã nhận");
    service.create(chef, request("10:00", "12:00", false));
  }

  @Test
  void releasedBookingsDoNotBlockChangesAndBoundaryDoesNotOverlap() {
    var slot = service.create(chef, request("09:00", "12:00", true));
    booking(chef, "2027-01-05 12:00", "2027-01-05 14:00");
    service.status(chef, slot.id(), new SellerScheduleStatusRequest(false, slot.version()));
    jdbc.update("update chef_bookings set booking_status='RELEASED' where chef_id=?", chef);
    assertThat(service.list(chef, day, day).bookings()).isEmpty();
    service.create(chef, request("12:00", "14:00", false));
  }

  @Test
  void inactiveChefCannotReadOrWriteSchedules() {
    jdbc.update("update users set is_active=false where id=?", chef);
    entityManager.clear();
    assertThatThrownBy(() -> service.list(chef, day, day)).hasMessageContaining("không hoạt động");
    assertThatThrownBy(() -> service.create(chef, request("09:00", "12:00", true)))
        .hasMessageContaining("không hoạt động");
  }

  @Test
  void concurrentOverlappingInsertsHaveOnlyOneWinner() throws Exception {
    TestTransaction.flagForCommit();
    TestTransaction.end();
    var pool = Executors.newFixedThreadPool(2);
    var start = new CountDownLatch(1);
    try {
      var task =
          (java.util.concurrent.Callable<Boolean>)
              () -> {
                start.await();
                try {
                  service.create(chef, request("09:00", "12:00", true));
                  return true;
                } catch (SellerScheduleException ex) {
                  return false;
                }
              };
      var first = pool.submit(task);
      var second = pool.submit(task);
      start.countDown();
      assertThat(
              java.util.List.of(first.get(15, TimeUnit.SECONDS), second.get(15, TimeUnit.SECONDS)))
          .containsExactlyInAnyOrder(true, false);
      assertThat(service.list(chef, day, day).slots()).hasSize(1);
    } finally {
      pool.shutdownNow();
    }
  }
}
