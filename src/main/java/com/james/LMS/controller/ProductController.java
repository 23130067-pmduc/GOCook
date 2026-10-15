package com.james.LMS.controller;

import com.james.LMS.response.ProductDetailResponse;
import com.james.LMS.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
  private final ProductService service;

  @GetMapping("/{id}")
  public ProductDetailResponse get(@PathVariable Long id) {
    return service.getPublished(id);
  }
}
