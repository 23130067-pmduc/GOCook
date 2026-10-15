package com.james.LMS.service;

import com.james.LMS.entity.CookOrder;
import com.james.LMS.enums.OrderStatus;
import com.james.LMS.repository.OrderRepository;
import com.james.LMS.response.CustomerOrderResponse;
import com.james.LMS.response.CustomerOrdersPageResponse;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CustomerOrderService {
  private final OrderRepository orderRepository;

  @Transactional(readOnly = true)
  public CustomerOrdersPageResponse list(Long customerId, String status, int page, int size) {
    if (page < 0 || size < 1 || size > 50) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "page hoặc size không hợp lệ");
    }

    var pageable = PageRequest.of(page, size,
        Sort.by(Sort.Direction.DESC, "createdAt").and(
            Sort.by(Sort.Direction.DESC, "id")));
    OrderStatus parsedStatus = parseStatus(status);
    Page<CookOrder> orders = parsedStatus == null
        ? orderRepository.findByCustomerIdAndIsActiveTrue(customerId, pageable)
        : orderRepository.findByCustomerIdAndStatusAndIsActiveTrue(customerId, parsedStatus, pageable);

    return CustomerOrdersPageResponse.from(orders.map(CustomerOrderResponse::from));
  }

  @Transactional(readOnly = true)
  public CustomerOrderResponse get(Long customerId, Long orderId) {
    CookOrder order = orderRepository.findByIdAndCustomerIdAndIsActiveTrue(orderId, customerId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy đơn hàng"));
    return CustomerOrderResponse.from(order);
  }

  private OrderStatus parseStatus(String status) {
    if (status == null || status.isBlank()) return null;
    try {
      return OrderStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));
    } catch (IllegalArgumentException ex) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Trạng thái không hợp lệ");
    }
  }
}
