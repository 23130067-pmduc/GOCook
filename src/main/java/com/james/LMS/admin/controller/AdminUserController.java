package com.james.LMS.admin.controller;

import com.james.LMS.admin.dto.AdminUserView;
import com.james.LMS.admin.dto.request.UpdateUserRequest;
import com.james.LMS.admin.dto.response.AdminUsersResponse;
import com.james.LMS.admin.service.AdminUserService;
import com.james.LMS.config.SecurityUserDetails;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminUserController {

  private final AdminUserService userService;

  @GetMapping
  public AdminUsersResponse search(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String role,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<AdminUserView> result = userService.search(q, role, status, page, size);
    return AdminUsersResponse.from(result, userService.roles());
  }

  @GetMapping("/{id}")
  public Map<String, Object> get(@PathVariable Long id) {
    return Map.of("user", userService.get(id), "roles", userService.roles());
  }

  @PutMapping("/{id}")
  public Map<String, Object> update(
      @PathVariable Long id,
      @RequestBody UpdateUserRequest request,
      @AuthenticationPrincipal SecurityUserDetails currentUser) {
    userService.update(id, request.username(), request.role(), request.active(), currentUser.getId());
    return Map.of("message", "Đã cập nhật người dùng.", "user", userService.get(id));
  }

  @PatchMapping("/{id}/toggle")
  public Map<String, Object> toggle(
      @PathVariable Long id,
      @AuthenticationPrincipal SecurityUserDetails currentUser) {
    userService.toggle(id, currentUser.getId());
    return Map.of("message", "Đã cập nhật trạng thái tài khoản.", "user", userService.get(id));
  }
}
