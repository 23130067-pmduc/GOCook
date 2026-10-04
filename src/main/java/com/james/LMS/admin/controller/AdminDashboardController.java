package com.james.LMS.admin.controller;

import com.james.LMS.admin.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminDashboardController {

  private final AdminDashboardService dashboardService;

  @GetMapping
  public String dashboard(Model model) {
    model.addAttribute("userCount", dashboardService.countUsers());
    model.addAttribute("productCount", dashboardService.countPublishedProducts());
    model.addAttribute("orderCount", dashboardService.countOrders());
    model.addAttribute("completedRevenue", dashboardService.completedRevenue());
    model.addAttribute("recentOrders", dashboardService.recentOrders());
    return "admin/admin";
  }
}
