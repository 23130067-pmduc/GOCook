package com.james.LMS.controller;

import com.james.LMS.config.SecurityUserDetails;
import com.james.LMS.enums.ProductStatus;
import com.james.LMS.request.SellerProductRequest;
import com.james.LMS.request.SellerProductStatusRequest;
import com.james.LMS.response.SellerProductResponse;
import com.james.LMS.service.SellerProductService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/seller/products")
@PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
@RequiredArgsConstructor
public class SellerProductController {
  private final SellerProductService service;

  @GetMapping
  public Page<SellerProductResponse> search(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String category,
      @RequestParam(required = false) ProductStatus status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "12") int size) {
    return service.search(actor.getId(), q, category, status, page, size);
  }

  @GetMapping("/options")
  public Map<String, Object> options(@AuthenticationPrincipal SecurityUserDetails actor) {
    return Map.of(
        "categories", service.categories(actor.getId()), "statuses", ProductStatus.values());
  }

  @GetMapping("/{id}")
  public SellerProductResponse get(
      @AuthenticationPrincipal SecurityUserDetails actor, @PathVariable Long id) {
    return service.get(actor.getId(), id);
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public SellerProductResponse create(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @Valid @RequestPart("menu") SellerProductRequest request,
      @RequestPart(value = "files", required = false) List<MultipartFile> files) {
    return service.create(actor.getId(), request, files);
  }

  @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public SellerProductResponse update(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @PathVariable Long id,
      @Valid @RequestPart("menu") SellerProductRequest request,
      @RequestPart(value = "files", required = false) List<MultipartFile> files) {
    return service.update(actor.getId(), id, request, files);
  }

  @PatchMapping("/{id}/status")
  public SellerProductResponse status(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @PathVariable Long id,
      @Valid @RequestBody SellerProductStatusRequest request) {
    return service.changeStatus(actor.getId(), id, request);
  }
}
