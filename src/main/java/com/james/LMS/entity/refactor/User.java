package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class User extends BaseEntity {

  @Column(name = "username", nullable = false)
  private String username;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "phone", nullable = false, length = 15)
  private String phone;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "avatar_url")
  private String avatarUrl;

  @Column(name = "province_code", length = 20)
  private String provinceCode;

  @Column(name = "ward_code", length = 20)
  private String wardCode;

  @Column(name = "address_detail", length = 500)
  private String addressDetail;

  @OneToOne(mappedBy = "user")
  private ChefProfile chefProfile;
}
