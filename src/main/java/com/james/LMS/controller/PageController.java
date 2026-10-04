package com.james.LMS.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

  @GetMapping("/")
  public String home() {
    return "index";
  }

  @GetMapping("/account")
  public String account() {
    return "customer/account";
  }

  @GetMapping("/admin/statistics")
  @PreAuthorize("hasAuthority('ROLE_SYSTEM_ADMIN')")
  public String adminStatistics() {
    return "admin/admin-statistics";
  }

  @GetMapping("/become-chef")
  public String becomeChef() {
    return "customer/become-chef";
  }

  @GetMapping("/cart")
  public String cart() {
    return "customer/cart";
  }

  @GetMapping("/cart-empty")
  public String cartEmpty() {
    return "customer/cart-empty";
  }

  @GetMapping("/cart-vegetarian")
  public String cartVegetarian() {
    return "customer/cart-vegetarian";
  }

  @GetMapping("/chat")
  public String chat() {
    return "customer/chat";
  }

  @GetMapping("/checkout")
  public String checkout() {
    return "customer/checkout";
  }

  @GetMapping("/checkout-vegetarian")
  public String checkoutVegetarian() {
    return "customer/checkout-vegetarian";
  }

  @GetMapping("/chef-an-nhien")
  public String chefAnNhien() {
    return "customer/chef-an-nhien";
  }

  @GetMapping("/chef-detail")
  public String chefDetail() {
    return "customer/chef-detail";
  }

  @GetMapping("/chefs")
  public String chefs() {
    return "customer/chefs";
  }

  @GetMapping("/forgot-password")
  public String forgotPassword() {
    return "auth/forgot-password";
  }

  @GetMapping("/help")
  public String help() {
    return "customer/help";
  }

  @GetMapping("/login")
  public String login() {
    return "auth/login";
  }

  @GetMapping("/logout")
  public String logout() {
    return "auth/logout";
  }

  @GetMapping("/matching")
  public String matching() {
    return "customer/matching";
  }

  @GetMapping("/menu-detail")
  public String menuDetail() {
    return "customer/menu-detail";
  }

  @GetMapping("/menu-vegetarian")
  public String menuVegetarian() {
    return "customer/menu-vegetarian";
  }

  @GetMapping("/menus")
  public String menus() {
    return "customer/menus";
  }

  @GetMapping("/offers")
  public String offers() {
    return "customer/offers";
  }

  @GetMapping("/order-detail")
  public String orderDetail() {
    return "customer/order-detail";
  }

  @GetMapping("/orders")
  public String orders() {
    return "customer/orders";
  }

  @GetMapping("/pages")
  public String pages() {
    return "customer/pages";
  }

  @GetMapping("/quotes")
  public String quotes() {
    return "customer/quotes";
  }

  @GetMapping("/register")
  public String register() {
    return "auth/register";
  }

  @GetMapping("/request")
  public String request() {
    return "customer/request";
  }

  @GetMapping("/reset-password")
  public String resetPassword() {
    return "auth/reset-password";
  }

  @GetMapping("/review")
  public String review() {
    return "customer/review";
  }

  @GetMapping("/seller")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String seller() {
    return "chef/seller";
  }

  @GetMapping("/seller/order-detail")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerOrderDetail() {
    return "chef/seller-order-detail";
  }

  @GetMapping("/seller/orders")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerOrders() {
    return "chef/seller-orders";
  }

  @GetMapping("/seller/product-edit")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerProductEdit() {
    return "chef/seller-product-edit";
  }

  @GetMapping("/seller/product-new")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerProductNew() {
    return "chef/seller-product-new";
  }

  @GetMapping("/seller/products")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerProducts() {
    return "chef/seller-products";
  }

  @GetMapping("/seller/revenue")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerRevenue() {
    return "chef/seller-revenue";
  }

  @GetMapping("/seller/schedule")
  @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
  public String sellerSchedule() {
    return "chef/seller-schedule";
  }

  @GetMapping("/success")
  public String success() {
    return "customer/success";
  }

  @GetMapping("/success-vegetarian")
  public String successVegetarian() {
    return "customer/success-vegetarian";
  }

  @GetMapping("/tracking")
  public String tracking() {
    return "customer/tracking";
  }

  @GetMapping("/verify-email")
  public String verifyEmail() {
    return "auth/verify-email";
  }

}
