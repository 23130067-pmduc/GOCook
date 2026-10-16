package com.james.LMS.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "chef_reports")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class ChefReport extends BaseEntity {

  @Column(name = "image_url", nullable = false, length = 300)
  private String imageUrl;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "booking_id", nullable = false)
  private Booking booking;
}
