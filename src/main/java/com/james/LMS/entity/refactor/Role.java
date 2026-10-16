package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
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

  @Column(name = "role_name", nullable = false)
  private String roleName;
}
