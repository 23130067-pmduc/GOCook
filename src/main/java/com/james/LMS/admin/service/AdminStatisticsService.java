package com.james.LMS.admin.service;

import com.james.LMS.admin.dto.response.AdminStatisticsResponse;
import com.james.LMS.entity.CookOrder;
import com.james.LMS.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminStatisticsService {

  private final AdminOrderService orderService;
  private final AdminDashboardService dashboardService;

  @Transactional(readOnly = true)
  public AdminStatisticsResponse getStatistics(LocalDate from, LocalDate to) {
    LocalDate effectiveTo = to == null ? LocalDate.now() : to;
    LocalDate effectiveFrom = from == null ? effectiveTo.minusMonths(5).withDayOfMonth(1) : from;
    if (effectiveFrom.isAfter(effectiveTo)) {
      throw new IllegalArgumentException("Ngày bắt đầu không thể sau ngày kết thúc.");
    }

    List<CookOrder> orders = orderService.findForStatistics(effectiveFrom, effectiveTo);
    BigDecimal revenue = orders.stream()
        .filter(order -> order.getStatus() == OrderStatus.COMPLETED)
        .map(CookOrder::getTotalAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    Map<YearMonth, BigDecimal> revenueByMonth = new LinkedHashMap<>();
    YearMonth cursor = YearMonth.from(effectiveFrom);
    YearMonth end = YearMonth.from(effectiveTo);
    while (!cursor.isAfter(end)) {
      revenueByMonth.put(cursor, BigDecimal.ZERO);
      cursor = cursor.plusMonths(1);
    }

    orders.stream()
        .filter(order -> order.getStatus() == OrderStatus.COMPLETED && order.getScheduledAt() != null)
        .forEach(order -> {
          YearMonth month = YearMonth.from(order.getScheduledAt());
          if (revenueByMonth.containsKey(month)) {
            revenueByMonth.put(month, revenueByMonth.get(month).add(order.getTotalAmount()));
          }
        });

    DateTimeFormatter labelFormatter = DateTimeFormatter.ofPattern("MM/yyyy");
    List<AdminStatisticsResponse.MonthlyRevenue> monthlyRevenue = new ArrayList<>();
    revenueByMonth.forEach((month, value) -> monthlyRevenue.add(
        new AdminStatisticsResponse.MonthlyRevenue(month.toString(), month.format(labelFormatter), value)));

    Map<String, Long> statusCounts = new LinkedHashMap<>();
    for (OrderStatus status : OrderStatus.values()) {
      statusCounts.put(status.name(), orders.stream().filter(order -> order.getStatus() == status).count());
    }

    return new AdminStatisticsResponse(
        effectiveFrom,
        effectiveTo,
        revenue,
        orders.size(),
        dashboardService.countActiveChefs(),
        dashboardService.countUsers(),
        monthlyRevenue,
        statusCounts);
  }
}
