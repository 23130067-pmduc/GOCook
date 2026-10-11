package com.james.LMS.admin.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record AdminStatisticsResponse(
    LocalDate from,
    LocalDate to,
    BigDecimal revenue,
    int orderCount,
    long chefCount,
    long userCount,
    List<MonthlyRevenue> monthlyRevenue,
    Map<String, Long> statusCounts) {

  public record MonthlyRevenue(String month, String label, BigDecimal revenue) {}
}
