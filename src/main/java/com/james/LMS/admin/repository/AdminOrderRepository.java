package com.james.LMS.admin.repository;

import com.james.LMS.admin.entity.AdminOrder;
import com.james.LMS.admin.enums.AdminOrderStatus;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminOrderRepository
    extends JpaRepository<AdminOrder, Long>, JpaSpecificationExecutor<AdminOrder> {

  List<AdminOrder> findTop5ByOrderByCreatedAtDesc();

  @Query("select coalesce(sum(o.totalAmount), 0) from AdminOrder o where o.status = :status")
  BigDecimal sumByStatus(@Param("status") AdminOrderStatus status);
}
