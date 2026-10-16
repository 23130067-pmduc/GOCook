package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "dishes")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Dish extends BaseEntity {

  @Column(name = "name", nullable = false)
  private String name;
}
