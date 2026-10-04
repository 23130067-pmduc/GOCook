package com.james.LMS.admin.repository;

import com.james.LMS.admin.entity.AdminProduct;
import com.james.LMS.admin.enums.AdminProductStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminProductRepository extends JpaRepository<AdminProduct, Long> {

  @Query(
      """
      select p from AdminProduct p
      where (:query = ''
             or lower(p.name) like lower(concat('%', :query, '%'))
             or lower(coalesce(p.description, '')) like lower(concat('%', :query, '%'))
             or lower(coalesce(p.dishItems, '')) like lower(concat('%', :query, '%')))
        and (:category = '' or lower(p.category) = lower(:category))
        and (:status is null or p.status = :status)
      order by p.updatedAt desc
      """)
  Page<AdminProduct> search(
      @Param("query") String query,
      @Param("category") String category,
      @Param("status") AdminProductStatus status,
      Pageable pageable);

  @Query("select distinct p.category from AdminProduct p where p.category is not null order by p.category")
  List<String> findDistinctCategories();

  long countByStatus(AdminProductStatus status);
}
