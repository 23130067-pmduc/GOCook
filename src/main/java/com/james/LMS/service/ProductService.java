package com.james.LMS.service;

import com.james.LMS.response.ProductDetailResponse;

public interface ProductService {
  ProductDetailResponse getPublished(Long id);
}
