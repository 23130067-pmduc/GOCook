package com.james.LMS.service;

import com.james.LMS.enums.FileType;

public interface CloudinaryService {
  record MenuImage(String url, String publicId) {}

  MenuImage uploadMenuImage(byte[] image);

  void deleteMenuImage(String publicId);

  String uploadFile(byte[] image, FileType resourceType);
}
