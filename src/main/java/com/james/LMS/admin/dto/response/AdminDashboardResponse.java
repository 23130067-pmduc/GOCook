package com.james.LMS.admin.dto.response;

import com.james.LMS.entity.CookOrder;
import java.math.BigDecimal;
import java.util.List;

public record AdminDashboardResponse(
    long userCount,
    long productCount,
    long orderCount,
    BigDecimal completedRevenue,
    List<CookOrder> recentOrders) {}
