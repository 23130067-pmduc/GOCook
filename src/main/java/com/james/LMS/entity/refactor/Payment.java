package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Payment extends BaseEntity {

  @Column(name = "payment_method", length = 30)
  private String paymentMethod;

  @Column(name = "transaction_code", length = 150)
  private String transactionCode;

  @Column(name = "amount", precision = 12, scale = 2)
  private BigDecimal amount;

  @Column(name = "status", length = 30)
  private String status;

  @Column(name = "paid_at")
  private Instant paidAt;

  @Column(name = "provider_response_code", length = 100)
  private String providerResponseCode;
}
