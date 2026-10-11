package com.james.LMS.admin.dto.request;

import com.james.LMS.enums.OrderStatus;

public record UpdateOrderRequest(OrderStatus status, String internalNote) {}
