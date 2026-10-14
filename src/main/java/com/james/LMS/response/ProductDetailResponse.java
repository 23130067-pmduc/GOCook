package com.james.LMS.response;

import com.james.LMS.entity.Product;
import com.james.LMS.entity.ProductImage;
import java.util.List;

public record ProductDetailResponse(
    Long id,
    String name,
    String category,
    String unitPrice,
    Integer minGuests,
    Integer maxGuests,
    String dishItems,
    String description,
    String imageUrl,
    String sellerName,
    List<Image> images) {
  public record Image(Long id, String url, String name, boolean isCover, int displayOrder) {}

  public static ProductDetailResponse from(Product product, List<ProductImage> images, String sellerName) {
    return new ProductDetailResponse(
        product.getId(),
        product.getName(),
        product.getCategory(),
        product.getUnitPrice().toPlainString(),
        product.getMinGuests(),
        product.getMaxGuests(),
        product.getDishItems(),
        product.getDescription(),
        product.getImageUrl(),
        sellerName,
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
