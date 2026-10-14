package com.james.LMS.repository;

import com.james.LMS.entity.SellerSchedule;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SellerScheduleRepository extends JpaRepository<SellerSchedule, Long> {
  @Query(
      "select s from SellerSchedule s where s.sellerId=:seller and s.isActive=true and"
          + " s.serviceDate between :from and :to order by s.serviceDate, s.startTime")
  List<SellerSchedule> list(Long seller, LocalDate from, LocalDate to);

  @Query("select s from SellerSchedule s where s.id=:id and s.sellerId=:seller and s.isActive=true")
  Optional<SellerSchedule> owned(Long seller, Long id);

  Optional<SellerSchedule> findBySellerIdAndServiceDateAndStartTimeAndEndTime(
      Long seller, LocalDate date, LocalTime start, LocalTime end);
}
