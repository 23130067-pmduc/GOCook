package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import com.james.LMS.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
    name = "booking_requests",
    uniqueConstraints =
        @UniqueConstraint(
            name = "uk_booking_requests_chef_booking",
            columnNames = {"chef_id", "booking_id"}))
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class BookingRequest extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "booking_id", nullable = false)
  private Booking booking;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "chef_id", nullable = false)
  private User chef;

  @Column(name = "status", nullable = false, length = 30)
  private String status;
}
