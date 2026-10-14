package com.james.LMS.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "product_images")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductImage extends BaseEntity {
  @Column(name = "product_id", nullable = false)
  private Long productId;

  @Column(name = "image_url", nullable = false, length = 2000)
  private String imageUrl;

  @Column(name = "cloudinary_public_id", length = 500)
  private String cloudinaryPublicId;

  @Column(name = "alt_text", length = 255)
  private String altText;

  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  @Column(name = "is_cover", nullable = false)
  private boolean cover;

  public void deactivate() {
    isActive = false;
    cover = false;
  }
}
