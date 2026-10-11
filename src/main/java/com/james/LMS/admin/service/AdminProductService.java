package com.james.LMS.admin.service;

import com.james.LMS.entity.Product;
import com.james.LMS.enums.ProductStatus;
import com.james.LMS.repository.ProductRepository;
import com.james.LMS.admin.util.AdminPaging;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminProductService {

  private static final List<String> DEFAULT_CATEGORIES =
      List.of("Món miền Nam", "Món miền Bắc", "Món miền Trung", "Món chay", "Khác");

  private final ProductRepository productRepository;

  @Transactional(readOnly = true)
  public Page<Product> search(
      String query, String category, String status, int page, int size) {
    return productRepository.search(
        normalize(query),
        normalize(category),
        parseStatus(status),
        AdminPaging.of(page, size));
  }

  @Transactional(readOnly = true)
  public Product get(Long id) {
    return productRepository
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm."));
  }

  @Transactional(readOnly = true)
  public List<String> categories() {
    LinkedHashSet<String> categories = new LinkedHashSet<>(DEFAULT_CATEGORIES);
    categories.addAll(productRepository.findDistinctCategories());
    return List.copyOf(categories);
  }

  public ProductStatus[] statuses() {
    return ProductStatus.values();
  }

  @Transactional
  public Product create(
      String name,
      String category,
      BigDecimal unitPrice,
      Integer minGuests,
      Integer maxGuests,
      String dishItems,
      String description,
      String imageUrl,
      ProductStatus status) {
    validate(name, category, unitPrice, minGuests, maxGuests, status);

    return productRepository.save(
        Product.builder()
            .name(name.trim())
            .category(category.trim())
            .unitPrice(unitPrice)
            .minGuests(minGuests)
            .maxGuests(maxGuests)
            .dishItems(cleanOptional(dishItems))
            .description(cleanOptional(description))
            .imageUrl(cleanOptional(imageUrl))
            .status(status)
            .build());
  }

  @Transactional
  public void update(
      Long id,
      String name,
      String category,
      BigDecimal unitPrice,
      Integer minGuests,
      Integer maxGuests,
      String dishItems,
      String description,
      String imageUrl,
      ProductStatus status) {
    validate(name, category, unitPrice, minGuests, maxGuests, status);

    Product product = get(id);
    product.setName(name.trim());
    product.setCategory(category.trim());
    product.setUnitPrice(unitPrice);
    product.setMinGuests(minGuests);
    product.setMaxGuests(maxGuests);
    product.setDishItems(cleanOptional(dishItems));
    product.setDescription(cleanOptional(description));
    product.setImageUrl(cleanOptional(imageUrl));
    product.setStatus(status);
    productRepository.save(product);
  }

  @Transactional
  public void toggleVisibility(Long id) {
    Product product = get(id);
    product.setStatus(
        product.getStatus() == ProductStatus.PUBLISHED
            ? ProductStatus.HIDDEN
            : ProductStatus.PUBLISHED);
    productRepository.save(product);
  }

  @Transactional(readOnly = true)
  public long countPublished() {
    return productRepository.countByStatus(ProductStatus.PUBLISHED);
  }

  private ProductStatus parseStatus(String status) {
    if (status == null || status.isBlank()) {
      return null;
    }
    try {
      return ProductStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));
    } catch (IllegalArgumentException ignored) {
      return null;
    }
  }

  private void validate(
      String name,
      String category,
      BigDecimal unitPrice,
      Integer minGuests,
      Integer maxGuests,
      ProductStatus status) {
    requireText(name, "Tên thực đơn không được để trống.");
    requireText(category, "Danh mục không được để trống.");
    if (unitPrice == null || unitPrice.signum() < 0) {
      throw new IllegalArgumentException("Giá mỗi người phải lớn hơn hoặc bằng 0.");
    }
    if (minGuests == null || maxGuests == null || minGuests < 1 || maxGuests < 1) {
      throw new IllegalArgumentException("Số khách phải lớn hơn 0.");
    }
    if (minGuests > maxGuests) {
      throw new IllegalArgumentException("Số khách tối thiểu không thể lớn hơn số khách tối đa.");
    }
    if (status == null) {
      throw new IllegalArgumentException("Trạng thái sản phẩm không hợp lệ.");
    }
  }

  private void requireText(String value, String message) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException(message);
    }
  }

  private String cleanOptional(String value) {
    return value == null || value.isBlank() ? null : value.trim();
  }

  private String normalize(String value) {
    return value == null ? "" : value.trim();
  }
}
