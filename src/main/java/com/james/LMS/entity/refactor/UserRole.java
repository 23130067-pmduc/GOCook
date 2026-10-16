package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import com.james.LMS.entity.Role;
import com.james.LMS.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "user_roles")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class UserRole extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "role_id", nullable = false)
  private Role role;
}
