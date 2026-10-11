package com.james.LMS.admin.enums;

import java.util.Locale;

public enum RevenueGroupBy {
    DAY,
    MONTH,
    YEAR;

    public static RevenueGroupBy from(String value) {
        if (value == null || value.isBlank()) {
            return MONTH;
        }

        try {
            return RevenueGroupBy.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ignored) {
            return MONTH;
        }
    }
}