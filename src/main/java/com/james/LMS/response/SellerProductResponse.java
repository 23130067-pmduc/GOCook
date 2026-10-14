package com.james.LMS.response;

import com.james.LMS.entity.Product;
import com.james.LMS.entity.ProductImage;
import com.james.LMS.enums.ProductStatus;
import java.util.List;

public record SellerProductResponse(
    Long id,
    Long version,
    String name,
    String category,
    String unitPrice,
    Integer minGuests,
    Integer maxGuests,
    String dishItems,
    String description,
    String imageUrl,
    ProductStatus status,
    List<Image> images) {
  public record Image(Long id, String url, String name, boolean isCover, int displayOrder) {}

  public static SellerProductResponse from(Product product, List<ProductImage> images) {
    return new SellerProductResponse(
        product.getId(),
        product.getVersion(),
        product.getName(),
        product.getCategory(),
        product.getUnitPrice().toPlainString(),
        product.getMinGuests(),
        product.getMaxGuests(),
        product.getDishItems(),
        product.getDescription(),
        product.getImageUrl(),
        product.getStatus(),
        images.stream()
            .filter(ProductImage::isActive)
            .map(
                image ->
                    new Image(
                        image.getId(),
                        image.getImageUrl(),
                        image.getAltText(),
                        image.isCover(),
                        image.getDisplayOrder()))
            .toList());
  }
}
