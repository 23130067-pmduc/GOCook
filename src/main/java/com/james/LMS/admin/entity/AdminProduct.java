package com.james.LMS.admin.entity;

import com.james.LMS.admin.enums.AdminProductStatus;
import com.james.LMS.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "products")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AdminProduct extends BaseEntity {

  @Column(name = "name", nullable = false, length = 255)
  private String name;

  @Column(name = "category", nullable = false, length = 100)
  private String category;

  @Column(name = "unit_price", nullable = false, precision = 14, scale = 2)
  private BigDecimal unitPrice;

  @Column(name = "min_guests", nullable = false)
  private Integer minGuests;

  @Column(name = "max_guests", nullable = false)
  private Integer maxGuests;

  @Column(name = "dish_items", columnDefinition = "TEXT")
  private String dishItems;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "image_url", length = 1000)
  private String imageUrl;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 30)
  private AdminProductStatus status;

  public String getDisplayCode() {
    return getId() == null ? "SP-MỚI" : "SP-%04d".formatted(getId());
  }
}
