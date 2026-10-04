package com.james.LMS.admin.service;

import com.james.LMS.admin.entity.AdminOrder;
import com.james.LMS.admin.enums.AdminOrderStatus;
import com.james.LMS.admin.enums.AdminProductStatus;
import com.james.LMS.admin.repository.AdminOrderRepository;
import com.james.LMS.admin.repository.AdminProductRepository;
import com.james.LMS.admin.repository.AdminUserRepository;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

  private final AdminUserRepository userRepository;
  private final AdminProductRepository productRepository;
  private final AdminOrderRepository orderRepository;

  @Transactional(readOnly = true)
  public long countUsers() {
    return userRepository.count();
  }

  @Transactional(readOnly = true)
  public long countPublishedProducts() {
    return productRepository.countByStatus(AdminProductStatus.PUBLISHED);
  }

  @Transactional(readOnly = true)
  public long countOrders() {
    return orderRepository.count();
  }

  @Transactional(readOnly = true)
  public BigDecimal completedRevenue() {
    BigDecimal revenue = orderRepository.sumByStatus(AdminOrderStatus.COMPLETED);
    return revenue == null ? BigDecimal.ZERO : revenue;
  }

  @Transactional(readOnly = true)
  public List<AdminOrder> recentOrders() {
    return orderRepository.findTop5ByOrderByCreatedAtDesc();
  }
}
