package com.james.LMS.admin.service;

import com.james.LMS.admin.dto.AdminUserView;
import com.james.LMS.admin.repository.AdminUserRepository;
import com.james.LMS.admin.util.AdminPaging;
import com.james.LMS.entity.Role;
import com.james.LMS.entity.User;
import com.james.LMS.enums.RoleEnum;
import com.james.LMS.repository.RoleRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminUserService {

  private final AdminUserRepository userRepository;
  private final RoleRepository roleRepository;

  @Transactional(readOnly = true)
  public Page<AdminUserView> search(
      String query, String role, String status, int page, int size) {
    RoleEnum roleFilter = parseRole(role);
    Boolean activeFilter = parseActive(status);

    return userRepository
        .search(
            normalizeQuery(query),
            roleFilter == null ? null : roleFilter.name(),
            activeFilter,
            AdminPaging.of(page, size))
        .map(this::toView);
  }

  @Transactional(readOnly = true)
  public AdminUserView get(Long id) {
    return toView(findUser(id));
  }

  @Transactional
  public void update(
      Long id, String username, RoleEnum role, boolean active, Long currentAdminId) {
    User user = findUser(id);
    AdminUserView current = toView(user);
    String cleanUsername = requireText(username, "Tên hiển thị không được để trống.");

    protectAdminAccount(current, role, active, currentAdminId);

    Role targetRole =
        roleRepository
            .findRoleByRoleName(role)
            .orElseThrow(() -> new IllegalArgumentException("Vai trò chưa tồn tại trong cơ sở dữ liệu."));

    user.changeUsername(cleanUsername);
    user.getRoles().clear();
    user.addRole(targetRole);
    userRepository.save(user);
    userRepository.updateActive(id, active);
  }

  @Transactional
  public void toggle(Long id, Long currentAdminId) {
    AdminUserView user = get(id);
    boolean nextActive = !user.isActive();
    protectAdminAccount(user, user.getRole(), nextActive, currentAdminId);
    userRepository.updateActive(id, nextActive);
  }

  private void protectAdminAccount(
      AdminUserView target, RoleEnum nextRole, boolean nextActive, Long currentAdminId) {
    boolean removingAdminAccess = target.getRole() == RoleEnum.ADMIN && nextRole != RoleEnum.ADMIN;
    boolean disablingAdmin = target.getRole() == RoleEnum.ADMIN && !nextActive;

    if (target.getId().equals(currentAdminId) && (removingAdminAccess || !nextActive)) {
      throw new IllegalArgumentException("Bạn không thể tự khóa hoặc gỡ quyền quản trị của chính mình.");
    }

    if ((removingAdminAccess || disablingAdmin)
        && userRepository.countActiveByRole(RoleEnum.ADMIN.name()) <= 1) {
      throw new IllegalArgumentException("Hệ thống phải còn ít nhất một quản trị viên đang hoạt động.");
    }
  }

  private User findUser(Long id) {
    return userRepository
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng."));
  }

  private AdminUserView toView(User user) {
    RoleEnum role =
        roleRepository.findAllByUserId(user.getId()).stream()
            .map(Role::getRoleName)
            .min(Comparator.comparingInt(this::rolePriority))
            .orElse(RoleEnum.USER);

    return AdminUserView.builder()
        .id(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
        .role(role)
        .roleLabel(roleLabel(role))
        .active(user.isActive())
        .createdAt(user.getCreatedAt())
        .build();
  }

  public List<RoleEnum> roles() {
    return List.of(RoleEnum.USER, RoleEnum.INSTRUCTOR, RoleEnum.ADMIN, RoleEnum.COMPANY_ADMIN);
  }

  public String roleLabel(RoleEnum role) {
    if (role == null) {
      return "Khách hàng";
    }
    return switch (role) {
      case USER -> "Khách hàng";
      case INSTRUCTOR -> "Người bán";
      case ADMIN -> "Quản trị viên";
      case COMPANY_ADMIN -> "Quản trị công ty";
    };
  }

  private int rolePriority(RoleEnum role) {
    return switch (role) {
      case ADMIN -> 0;
      case COMPANY_ADMIN -> 1;
      case INSTRUCTOR -> 2;
      case USER -> 3;
    };
  }

  private RoleEnum parseRole(String role) {
    if (role == null || role.isBlank()) {
      return null;
    }
    try {
      return RoleEnum.valueOf(role.trim().toUpperCase(Locale.ROOT));
    } catch (IllegalArgumentException ignored) {
      return null;
    }
  }

  private Boolean parseActive(String status) {
    if (status == null || status.isBlank()) {
      return null;
    }
    if ("active".equalsIgnoreCase(status)) {
      return true;
    }
    if ("inactive".equalsIgnoreCase(status)) {
      return false;
    }
    return null;
  }

  private String normalizeQuery(String value) {
    return value == null ? "" : value.trim();
  }

  private String requireText(String value, String message) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException(message);
    }
    return value.trim();
  }
}
