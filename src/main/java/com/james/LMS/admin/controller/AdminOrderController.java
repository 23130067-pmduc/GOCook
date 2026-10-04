package com.james.LMS.admin.controller;

import com.james.LMS.admin.entity.AdminOrder;
import com.james.LMS.admin.enums.AdminOrderStatus;
import com.james.LMS.admin.service.AdminOrderService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class AdminOrderController {

  private final AdminOrderService orderService;

  @GetMapping("/orders")
  public String orders(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(required = false)
          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
          LocalDate from,
      @RequestParam(required = false)
          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
          LocalDate to,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      Model model,
      RedirectAttributes redirect) {
    try {
      Page<AdminOrder> orderPage = orderService.search(q, status, from, to, page, size);
      model.addAttribute("orderPage", orderPage);
      model.addAttribute("orders", orderPage.getContent());
      model.addAttribute("q", q);
      model.addAttribute("selectedStatus", status);
      model.addAttribute("from", from);
      model.addAttribute("to", to);
      model.addAttribute("orderStatuses", orderService.statuses());
      model.addAttribute("pageSize", orderPage.getSize());
      return "admin/admin-orders";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/orders";
    }
  }

  @GetMapping("/order-detail")
  public String orderDetail(@RequestParam Long id, Model model, RedirectAttributes redirect) {
    try {
      model.addAttribute("order", orderService.get(id));
      model.addAttribute("allowedOrderStatuses", orderService.allowedStatuses(id));
      return "admin/admin-order-detail";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/orders";
    }
  }

  @PostMapping("/orders/update")
  public String updateOrder(
      @RequestParam Long id,
      @RequestParam AdminOrderStatus status,
      @RequestParam(required = false) String internalNote,
      RedirectAttributes redirect) {
    try {
      orderService.update(id, status, internalNote);
      redirect.addFlashAttribute("successMessage", "Đã cập nhật đơn hàng.");
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
    }
    return "redirect:/admin/order-detail?id=" + id;
  }
}
