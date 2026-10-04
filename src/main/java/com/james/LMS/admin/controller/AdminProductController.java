package com.james.LMS.admin.controller;

import com.james.LMS.admin.entity.AdminProduct;
import com.james.LMS.admin.enums.AdminProductStatus;
import com.james.LMS.admin.service.AdminProductService;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
public class AdminProductController {

  private final AdminProductService productService;

  @GetMapping("/products")
  public String products(
      @RequestParam(defaultValue = "") String q,
      @RequestParam(defaultValue = "") String category,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      Model model) {
    Page<AdminProduct> productPage = productService.search(q, category, status, page, size);
    model.addAttribute("productPage", productPage);
    model.addAttribute("products", productPage.getContent());
    model.addAttribute("q", q);
    model.addAttribute("selectedCategory", category);
    model.addAttribute("selectedStatus", status);
    model.addAttribute("categories", productService.categories());
    model.addAttribute("productStatuses", productService.statuses());
    model.addAttribute("pageSize", productPage.getSize());
    return "admin/admin-products";
  }

  @GetMapping("/product-new")
  public String newProduct(Model model) {
    model.addAttribute(
        "product",
        AdminProduct.builder()
            .minGuests(3)
            .maxGuests(8)
            .status(AdminProductStatus.DRAFT)
            .build());
    addFormOptions(model);
    return "admin/admin-product-new";
  }

  @PostMapping("/products/create")
  public String createProduct(
      @RequestParam String name,
      @RequestParam String category,
      @RequestParam BigDecimal unitPrice,
      @RequestParam Integer minGuests,
      @RequestParam Integer maxGuests,
      @RequestParam(required = false) String dishItems,
      @RequestParam(required = false) String description,
      @RequestParam(required = false) String imageUrl,
      @RequestParam AdminProductStatus status,
      RedirectAttributes redirect) {
    try {
      productService.create(
          name,
          category,
          unitPrice,
          minGuests,
          maxGuests,
          dishItems,
          description,
          imageUrl,
          status);
      redirect.addFlashAttribute("successMessage", "Đã thêm thực đơn mới.");
      return "redirect:/admin/products";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/product-new";
    }
  }

  @GetMapping("/product-edit")
  public String editProduct(@RequestParam Long id, Model model, RedirectAttributes redirect) {
    try {
      model.addAttribute("product", productService.get(id));
      addFormOptions(model);
      return "admin/admin-product-edit";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/products";
    }
  }

  @PostMapping("/products/update")
  public String updateProduct(
      @RequestParam Long id,
      @RequestParam String name,
      @RequestParam String category,
      @RequestParam BigDecimal unitPrice,
      @RequestParam Integer minGuests,
      @RequestParam Integer maxGuests,
      @RequestParam(required = false) String dishItems,
      @RequestParam(required = false) String description,
      @RequestParam(required = false) String imageUrl,
      @RequestParam AdminProductStatus status,
      RedirectAttributes redirect) {
    try {
      productService.update(
          id,
          name,
          category,
          unitPrice,
          minGuests,
          maxGuests,
          dishItems,
          description,
          imageUrl,
          status);
      redirect.addFlashAttribute("successMessage", "Đã cập nhật thực đơn.");
      return "redirect:/admin/products";
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
      return "redirect:/admin/product-edit?id=" + id;
    }
  }

  @PostMapping("/products/toggle-visibility")
  public String toggleVisibility(@RequestParam Long id, RedirectAttributes redirect) {
    try {
      productService.toggleVisibility(id);
      redirect.addFlashAttribute("successMessage", "Đã cập nhật trạng thái hiển thị.");
    } catch (IllegalArgumentException ex) {
      redirect.addFlashAttribute("errorMessage", ex.getMessage());
    }
    return "redirect:/admin/products";
  }

  private void addFormOptions(Model model) {
    model.addAttribute("categories", productService.categories());
    model.addAttribute("productStatuses", productService.statuses());
  }
}
