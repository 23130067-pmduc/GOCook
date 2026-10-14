package com.james.LMS.service;

import com.james.LMS.enums.ProductStatus;
import com.james.LMS.request.SellerProductRequest;
import com.james.LMS.request.SellerProductStatusRequest;
import com.james.LMS.response.SellerProductResponse;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface SellerProductService {
  List<String> categories(Long sellerId);

  Page<SellerProductResponse> search(
      Long sellerId, String query, String category, ProductStatus status, int page, int size);

  SellerProductResponse get(Long sellerId, Long id);

  SellerProductResponse create(
      Long sellerId, SellerProductRequest request, List<MultipartFile> files);

  SellerProductResponse update(
      Long sellerId, Long id, SellerProductRequest request, List<MultipartFile> files);

  SellerProductResponse changeStatus(Long sellerId, Long id, SellerProductStatusRequest request);
}
