package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import com.james.LMS.entity.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "booking_price_offers")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class BookingPriceOffer extends BaseEntity {

  @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
  private BigDecimal totalAmount;

  @Column(name = "status", length = 100)
  private String status;

  @Column(name = "message")
  private String message;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "conversation_id", nullable = false)
  private ChatConversation conversation;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "sender_user_id", nullable = false)
  private User sender;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "booking_id", nullable = false)
  private Booking booking;
}
