package com.james.LMS.controller;

import com.james.LMS.config.SecurityUserDetails;
import com.james.LMS.request.SellerScheduleRequest;
import com.james.LMS.request.SellerScheduleStatusRequest;
import com.james.LMS.response.SellerScheduleResponse;
import com.james.LMS.service.SellerScheduleService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/schedules")
@PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
@RequiredArgsConstructor
@Validated
public class SellerScheduleController {
  private final SellerScheduleService service;

  @GetMapping
  public SellerScheduleResponse list(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @RequestParam LocalDate from,
      @RequestParam LocalDate to) {
    return service.list(actor.getId(), from, to);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public SellerScheduleResponse.Slot create(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @Valid @RequestBody SellerScheduleRequest request) {
    return service.create(actor.getId(), request);
  }

  @PatchMapping("/{id}/availability")
  public SellerScheduleResponse.Slot status(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @PathVariable Long id,
      @Valid @RequestBody SellerScheduleStatusRequest request) {
    return service.status(actor.getId(), id, request);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(
      @AuthenticationPrincipal SecurityUserDetails actor,
      @PathVariable Long id,
      @RequestParam @PositiveOrZero Long version) {
    service.delete(actor.getId(), id, version);
  }
}
