package com.james.LMS.admin.dto.request;

import com.james.LMS.enums.RoleEnum;

public record UpdateUserRequest(String username, RoleEnum role, boolean active) {}
