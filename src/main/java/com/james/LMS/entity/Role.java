package com.james.LMS.entity;

import com.james.LMS.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Role extends BaseEntity {

  @Enumerated(EnumType.STRING)
  @Column(name = "role_name", nullable = false)
  private RoleEnum roleName;
}
