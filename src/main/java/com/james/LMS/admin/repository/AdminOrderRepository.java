package com.james.LMS.admin.repository;

import com.james.LMS.admin.entity.AdminOrder;
import com.james.LMS.admin.enums.AdminOrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminOrderRepository extends JpaRepository<AdminOrder, Long> {

  @Query(
      """
      select o from AdminOrder o
      where (:query = ''
             or lower(o.orderCode) like lower(concat('%', :query, '%'))
             or lower(o.customerName) like lower(concat('%', :query, '%'))
             or lower(coalesce(o.customerEmail, '')) like lower(concat('%', :query, '%'))
             or lower(o.productName) like lower(concat('%', :query, '%'))
             or lower(coalesce(o.chefName, '')) like lower(concat('%', :query, '%')))
        and (:status is null or o.status = :status)
        and (:fromDate is null or o.scheduledAt >= :fromDate)
        and (:toDateExclusive is null or o.scheduledAt < :toDateExclusive)
      order by o.scheduledAt desc
      """)
  Page<AdminOrder> search(
      @Param("query") String query,
      @Param("status") AdminOrderStatus status,
      @Param("fromDate") LocalDateTime fromDate,
      @Param("toDateExclusive") LocalDateTime toDateExclusive,
      Pageable pageable);

  List<AdminOrder> findTop5ByOrderByCreatedAtDesc();

  @Query("select coalesce(sum(o.totalAmount), 0) from AdminOrder o where o.status = :status")
  BigDecimal sumByStatus(@Param("status") AdminOrderStatus status);
}
