package com.james.LMS.admin.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record AdminStatisticsResponse(
        LocalDate from,
        LocalDate to,
        String groupBy,
        BigDecimal revenue,
        int orderCount,
        long chefCount,
        long userCount,
        List<RevenuePoint> revenueSeries,
        Map<String, Long> statusCounts) {

    public record RevenuePoint(
            String key,
            String label,
            BigDecimal revenue,
            long completedOrders) {
    }
}