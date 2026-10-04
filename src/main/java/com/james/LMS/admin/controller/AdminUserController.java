package com.james.LMS.admin.controller;

import com.james.LMS.admin.dto.AdminUserView;
import com.james.LMS.admin.service.AdminUserService;
import com.james.LMS.config.SecurityUserDetails;
import com.james.LMS.enums.RoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminUserController {

  private final AdminUserService userService;

  @GetMapping("/users")
  public String users(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String role,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      Model model) {
    Page<AdminUserView> userPage = userService.search(q, role, status, page, size);
    model.addAttribute("userPage", userPage);
    model.addAttribute("users", userPage.getContent());
    model.addAttribute("q", q);
    model.addAttribute("selectedRole", role);
    model.addAttribute("selectedStatus", status);
    model.addAttribute("roles", userService.roles());
    model.addAttribute("pageSize", userPage.getSize());
    return "admin/admin-users";
  }

  @GetMapping("/user-edit")
  public String editUser(@RequestParam Long id, Model model, RedirectAttributes redirect) {
    try {
      model.addAttribute("user", userService.get(id));
      model.addAttribute("roles", userService.roles());
      return "admin/admin-user-edit";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/users";
    }
  }

  @PostMapping("/users/update")
  public String updateUser(
      @RequestParam Long id,
      @RequestParam String username,
      @RequestParam RoleEnum role,
      @RequestParam(defaultValue = "false") boolean active,
      @AuthenticationPrincipal SecurityUserDetails currentUser,
      RedirectAttributes redirect) {
    try {
      userService.update(id, username, role, active, currentUser.getId());
      redirect.addFlashAttribute("successMessage", "Đã cập nhật người dùng.");
      return "redirect:/admin/users";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/user-edit?id=" + id;
    }
  }

  @PostMapping("/users/toggle")
  public String toggleUser(
      @RequestParam Long id,
      @AuthenticationPrincipal SecurityUserDetails currentUser,
      RedirectAttributes redirect) {
    try {
      userService.toggle(id, currentUser.getId());
      redirect.addFlashAttribute("successMessage", "Đã cập nhật trạng thái tài khoản.");
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
    }
    return "redirect:/admin/users";
  }
}
