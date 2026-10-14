package com.james.LMS.service;

import com.james.LMS.request.SellerScheduleRequest;
import com.james.LMS.request.SellerScheduleStatusRequest;
import com.james.LMS.response.SellerScheduleResponse;
import java.time.LocalDate;

public interface SellerScheduleService {
  SellerScheduleResponse list(Long chef, LocalDate from, LocalDate to);

  SellerScheduleResponse.Slot create(Long chef, SellerScheduleRequest request);

  SellerScheduleResponse.Slot status(Long chef, Long id, SellerScheduleStatusRequest request);

  void delete(Long chef, Long id, Long version);
}
