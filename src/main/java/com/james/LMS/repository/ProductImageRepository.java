package com.james.LMS.repository;

import com.james.LMS.entity.ProductImage;
import jakarta.persistence.LockModeType;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
  @Query(
      "select i from ProductImage i where i.productId = :productId order by i.displayOrder, i.id")
  List<ProductImage> findForProduct(Long productId);

  @Query(
      "select i from ProductImage i where i.productId in :productIds and i.isActive = true order by"
          + " i.displayOrder, i.id")
  List<ProductImage> findActiveForProducts(Collection<Long> productIds);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query(
      "select i from ProductImage i where i.id = :id and i.isActive = false and"
          + " i.cloudinaryPublicId is not null")
  Optional<ProductImage> lockPendingCleanup(Long id);
}
