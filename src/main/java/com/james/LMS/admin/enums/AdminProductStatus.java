package com.james.LMS.admin.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdminProductStatus {
  PUBLISHED("Đang hiển thị", ""),
  DRAFT("Bản nháp", "gold"),
  HIDDEN("Tạm ẩn", "gray");

  private final String label;
  private final String badgeClass;

  public String getValue() {
    return name();
  }
}
