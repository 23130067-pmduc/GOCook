package com.james.LMS.admin.service;

import com.james.LMS.admin.dto.response.AdminStatisticsResponse;
import com.james.LMS.admin.enums.RevenueGroupBy;
import com.james.LMS.entity.CookOrder;
import com.james.LMS.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminStatisticsService {

    private static final DateTimeFormatter DAY_LABEL = DateTimeFormatter.ofPattern("dd/MM");
    private static final DateTimeFormatter MONTH_LABEL = DateTimeFormatter.ofPattern("MM/yyyy");

    private final AdminOrderService orderService;
    private final AdminDashboardService dashboardService;

    @Transactional(readOnly = true)
    public AdminStatisticsResponse getStatistics(LocalDate from, LocalDate to, String groupByValue) {
        RevenueGroupBy groupBy = RevenueGroupBy.from(groupByValue);
        LocalDate effectiveTo = to == null ? LocalDate.now() : to;
        LocalDate effectiveFrom = from == null ? defaultFrom(effectiveTo, groupBy) : from;

        if (effectiveFrom.isAfter(effectiveTo)) {
            throw new IllegalArgumentException("Ngày bắt đầu không thể sau ngày kết thúc.");
        }

        List<CookOrder> orders = orderService.findForStatistics(effectiveFrom, effectiveTo);

        BigDecimal revenue = orders.stream()
                .filter(this::isCompleted)
                .map(CookOrder::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, RevenueBucket> buckets = createBuckets(effectiveFrom, effectiveTo, groupBy);

        orders.stream().filter(order -> isCompleted(order) && order.getScheduledAt() != null).forEach(order -> {
            String key = bucketKey(order.getScheduledAt().toLocalDate(), groupBy);
            RevenueBucket bucket = buckets.get(key);

            if (bucket != null) {
                bucket.add(order.getTotalAmount());
            }
        });

        List<AdminStatisticsResponse.RevenuePoint>
                revenueSeries = buckets.values().stream().map(bucket -> new AdminStatisticsResponse.RevenuePoint(
                bucket.key,
                bucket.label,
                bucket.revenue,
                bucket.completedOrders)).toList();

        Map<String, Long> statusCounts =
                new LinkedHashMap<>();

        for (OrderStatus status : OrderStatus.values()) {
            long count = orders.stream().filter(order -> order.getStatus() == status).count();
            statusCounts.put(status.name(), count);
        }

        return new AdminStatisticsResponse(effectiveFrom, effectiveTo, groupBy.name(), revenue, orders.size(), dashboardService.countActiveChefs(), dashboardService.countUsers(), revenueSeries, statusCounts);
    }

    private LocalDate defaultFrom(LocalDate to, RevenueGroupBy groupBy) {
        return switch (groupBy) {
            case DAY -> to.minusDays(29);
            case MONTH -> to.minusMonths(5).withDayOfMonth(1);
            case YEAR -> to.minusYears(4).withDayOfYear(1);
        };
    }

    private Map<String, RevenueBucket> createBuckets(LocalDate from, LocalDate to, RevenueGroupBy groupBy) {
        Map<String, RevenueBucket> buckets = new LinkedHashMap<>();

        switch (groupBy) {
            case DAY -> {
                LocalDate cursor = from;

                while (!cursor.isAfter(to)) {
                    String key = cursor.toString();
                    buckets.put(key, new RevenueBucket(key, cursor.format(DAY_LABEL)));
                    cursor = cursor.plusDays(1);
                }
            }

            case MONTH -> {
                YearMonth cursor = YearMonth.from(from);
                YearMonth end = YearMonth.from(to);

                while (!cursor.isAfter(end)) {
                    String key = cursor.toString();
                    buckets.put(key, new RevenueBucket(key, cursor.format(MONTH_LABEL)));
                    cursor = cursor.plusMonths(1);
                }
            }

            case YEAR -> {
                Year cursor = Year.from(from);
                Year end = Year.from(to);

                while (!cursor.isAfter(end)) {
                    String key = cursor.toString();
                    buckets.put(key, new RevenueBucket(key, key));
                    cursor = cursor.plusYears(1);
                }
            }
        }

        return buckets;
    }

    private String bucketKey(LocalDate date, RevenueGroupBy groupBy) {
        return switch (groupBy) {
            case DAY -> date.toString();
            case MONTH -> YearMonth.from(date).toString();
            case YEAR -> Year.from(date).toString();
        };
    }

    private boolean isCompleted(CookOrder order) {
        return order.getStatus() == OrderStatus.COMPLETED && order.getTotalAmount() != null;
    }

    private static final class RevenueBucket {

        private final String key;
        private final String label;
        private BigDecimal revenue = BigDecimal.ZERO;
        private long completedOrders;

        private RevenueBucket(String key, String label) {
            this.key = key;
            this.label = label;
        }

        private void add(BigDecimal amount) {
            revenue = revenue.add(amount == null ? BigDecimal.ZERO : amount);
            completedOrders++;
        }
    }
}