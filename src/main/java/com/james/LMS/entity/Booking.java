package com.james.LMS.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Booking extends BaseEntity {

  @Column(name = "booking_code", nullable = false, unique = true, length = 50)
  private String bookingCode;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "customer_id", nullable = false)
  private User customer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "chef_id")
  private User chef;

  @Column(name = "scheduled_at", nullable = false)
  private Instant scheduledAt;

  @Column(name = "service_address", nullable = false, length = 500)
  private String serviceAddress;

  /** JSON string stored in a jsonb column. */
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "customer_note", columnDefinition = "jsonb")
  private String customerNote;

  @Column(name = "guest_count", nullable = false)
  private Integer guestCount;

  @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
  private BigDecimal totalAmount;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "payment_id")
  private Payment payment;

  @Column(name = "booking_status", nullable = false, length = 30)
  @Builder.Default
  private String bookingStatus = "PENDING";
}
