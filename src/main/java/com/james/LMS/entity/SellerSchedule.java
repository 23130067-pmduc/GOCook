package com.james.LMS.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seller_schedules")
@Getter
@Setter
@NoArgsConstructor
public class SellerSchedule extends BaseEntity {
  @Column(name = "seller_id", nullable = false)
  private Long sellerId;

  @Column(name = "service_date", nullable = false)
  private LocalDate serviceDate;

  @Column(name = "start_time", nullable = false)
  private LocalTime startTime;

  @Column(name = "end_time", nullable = false)
  private LocalTime endTime;

  @Column(nullable = false)
  private boolean available;

  public void activate() {
    isActive = true;
    touch();
  }

  public void deactivate() {
    isActive = false;
    touch();
  }
}
