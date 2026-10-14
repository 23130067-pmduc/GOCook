package com.james.LMS.service.impl;

import com.james.LMS.repository.ProductImageRepository;
import com.james.LMS.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/** Runs after the menu commit so failed remote deletion cannot discard a saved menu. */
@Service
@RequiredArgsConstructor
public class ProductImageCleanupService {
  private final ProductImageRepository images;
  private final CloudinaryService cloudinary;

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void cleanup(Long id) {
    images
        .lockPendingCleanup(id)
        .ifPresent(
            image -> {
              cloudinary.deleteMenuImage(image.getCloudinaryPublicId());
              // Retain inactive image metadata, but do not retry a successful remote deletion.
              image.setCloudinaryPublicId(null);
              images.flush();
            });
  }
}
