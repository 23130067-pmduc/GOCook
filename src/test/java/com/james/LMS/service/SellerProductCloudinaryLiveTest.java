package com.james.LMS.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.james.LMS.config.CloudinaryConfig;
import com.james.LMS.service.impl.CloudinaryServiceImpl;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig({CloudinaryConfig.class, CloudinaryServiceImpl.class})
@TestPropertySource(
    locations = "file:.env",
    properties = {
      "cloudinary.cloudinary-name=${USER_SERVICE_CLOUDINARY_NAME}",
      "cloudinary.api-key=${USER_SERVICE_CLOUDINARY_API_KEY}",
      "cloudinary.api-secret=${USER_SERVICE_CLOUDINARY_API_SECRET}"
    })
@EnabledIfEnvironmentVariable(named = "GOCOOK_MENU_LIVE_CLOUDINARY", matches = "true")
class SellerProductCloudinaryLiveTest {
  @Autowired CloudinaryService service;

  @Test
  void uploadsActualMenuImageAndDeletesOnlyThatTemporaryAsset() throws Exception {
    CloudinaryService.MenuImage image = null;
    try {
      image =
          service.uploadMenuImage(
              Files.readAllBytes(Path.of("src/main/resources/static/assets/meal.png")));
      assertThat(image.url()).startsWith("https://res.cloudinary.com/");
      assertThat(image.publicId()).startsWith("gocook/menus/");
      service.deleteMenuImage(image.publicId());
      // Repeated deletion must also succeed (Cloudinary reports 'not found').
      service.deleteMenuImage(image.publicId());
    } finally {
      if (image != null) service.deleteMenuImage(image.publicId());
    }
  }
}
