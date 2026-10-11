package com.james.LMS.admin.dto.response;

import com.james.LMS.admin.dto.AdminUserView;
import com.james.LMS.enums.RoleEnum;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminUsersResponse(
    List<AdminUserView> content,
    int number,
    int size,
    int numberOfElements,
    long totalElements,
    int totalPages,
    boolean first,
    boolean last,
    List<RoleEnum> roles) {

  public static AdminUsersResponse from(Page<AdminUserView> page, List<RoleEnum> roles) {
    return new AdminUsersResponse(
        page.getContent(), page.getNumber(), page.getSize(), page.getNumberOfElements(),
        page.getTotalElements(), page.getTotalPages(), page.isFirst(), page.isLast(), roles);
  }
}
