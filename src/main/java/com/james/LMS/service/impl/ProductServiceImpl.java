package com.james.LMS.service.impl;

import com.james.LMS.exception.SellerProductException;
import com.james.LMS.repository.ProductImageRepository;
import com.james.LMS.repository.ProductRepository;
import com.james.LMS.repository.UserRepository;
import com.james.LMS.response.ProductDetailResponse;
import com.james.LMS.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
  private final ProductRepository products;
  private final ProductImageRepository images;
  private final UserRepository users;

  @Override
  @Transactional(readOnly = true)
  public ProductDetailResponse getPublished(Long id) {
    var product = products.findPublished(id).orElseThrow(
        () -> new SellerProductException(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", "Không tìm thấy thực đơn."));
    var sellerName = users.findById(product.getSellerId())
        .map(u -> u.getUsername())
        .orElse("");
    return ProductDetailResponse.from(product, images.findForProduct(id), sellerName);
  }
}
