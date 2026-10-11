package com.james.LMS.admin.controller;

import com.james.LMS.admin.dto.request.ProductRequest;
import com.james.LMS.admin.dto.response.AdminProductsResponse;
import com.james.LMS.entity.Product;
import com.james.LMS.admin.service.AdminProductService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminProductController {

  private final AdminProductService productService;

  @GetMapping
  public AdminProductsResponse search(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String category,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<Product> result = productService.search(q, category, status, page, size);
    return AdminProductsResponse.from(result, productService.categories(), productService.statuses());
  }

  @GetMapping("/options")
  public Map<String, Object> options() {
    return Map.of("categories", productService.categories(), "statuses", productService.statuses());
  }

  @GetMapping("/{id}")
  public Map<String, Object> get(@PathVariable Long id) {
    return Map.of(
        "product", productService.get(id),
        "categories", productService.categories(),
        "statuses", productService.statuses());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> create(@RequestBody ProductRequest request) {
    Product product = productService.create(
        request.name(), request.category(), request.unitPrice(), request.minGuests(), request.maxGuests(),
        request.dishItems(), request.description(), request.imageUrl(), request.status());
    return Map.of("message", "Đã thêm thực đơn mới.", "product", product);
  }

  @PutMapping("/{id}")
  public Map<String, Object> update(@PathVariable Long id, @RequestBody ProductRequest request) {
    productService.update(
        id, request.name(), request.category(), request.unitPrice(), request.minGuests(), request.maxGuests(),
        request.dishItems(), request.description(), request.imageUrl(), request.status());
    return Map.of("message", "Đã cập nhật thực đơn.", "product", productService.get(id));
  }

  @PatchMapping("/{id}/toggle")
  public Map<String, Object> toggle(@PathVariable Long id) {
    productService.toggleVisibility(id);
    return Map.of("message", "Đã cập nhật trạng thái hiển thị.", "product", productService.get(id));
  }
}
