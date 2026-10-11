package com.james.LMS.repository;

import com.james.LMS.entity.CookOrder;
import com.james.LMS.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository
    extends JpaRepository<CookOrder, Long>, JpaSpecificationExecutor<CookOrder> {

  List<CookOrder> findTop5ByOrderByCreatedAtDesc();

  @Query("select coalesce(sum(o.totalAmount), 0) from CookOrder o where o.status = :status")
  BigDecimal sumByStatus(@Param("status") OrderStatus status);

  @Query(
          """
          select coalesce(sum(o.totalAmount), 0)
          from CookOrder o
          where o.status = :status
            and o.scheduledAt >= :from
            and o.scheduledAt < :to
          """)
  BigDecimal sumByStatusAndScheduledAtBetween(
          @Param("status") OrderStatus status,
          @Param("from") LocalDateTime from,
          @Param("to") LocalDateTime to);
}
