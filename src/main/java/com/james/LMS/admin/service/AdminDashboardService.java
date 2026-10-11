package com.james.LMS.admin.service;

import com.james.LMS.entity.CookOrder;
import com.james.LMS.enums.OrderStatus;
import com.james.LMS.enums.ProductStatus;
import com.james.LMS.repository.OrderRepository;
import com.james.LMS.repository.ProductRepository;
import com.james.LMS.admin.repository.AdminUserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private static final ZoneId APP_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");

    private final AdminUserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public long countUsers() {
        return userRepository.count();
    }

    @Transactional(readOnly = true)
    public long countPublishedProducts() {
        return productRepository.countByStatus(ProductStatus.PUBLISHED);
    }

    @Transactional(readOnly = true)
    public long countOrders() {
        return orderRepository.count();
    }

    @Transactional(readOnly = true)
    public BigDecimal completedRevenue() {
        return safeRevenue(orderRepository.sumByStatus(OrderStatus.COMPLETED));
    }

    @Transactional(readOnly = true)
    public BigDecimal todayRevenue() {
        LocalDate today = LocalDate.now(APP_ZONE);

        return revenueBetween(today.atStartOfDay(), today.plusDays(1).atStartOfDay());
    }

    @Transactional(readOnly = true)
    public BigDecimal thisMonthRevenue() {
        LocalDate today = LocalDate.now(APP_ZONE);
        LocalDate firstDay = today.withDayOfMonth(1);

        return revenueBetween(firstDay.atStartOfDay(), firstDay.plusMonths(1).atStartOfDay());
    }

    @Transactional(readOnly = true)
    public BigDecimal thisYearRevenue() {
        LocalDate today = LocalDate.now(APP_ZONE);
        LocalDate firstDay = today.withDayOfYear(1);

        return revenueBetween(firstDay.atStartOfDay(), firstDay.plusYears(1).atStartOfDay());
    }

    @Transactional(readOnly = true)
    public long countActiveChefs() {
        return userRepository.countActiveByRole("INSTRUCTOR");
    }

    @Transactional(readOnly = true)
    public List<CookOrder> recentOrders() {
        return orderRepository.findTop5ByOrderByCreatedAtDesc();
    }

    private BigDecimal revenueBetween(LocalDateTime from, LocalDateTime to) {
        return safeRevenue(orderRepository.sumByStatusAndScheduledAtBetween(OrderStatus.COMPLETED, from, to));
    }

    private BigDecimal safeRevenue(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}
