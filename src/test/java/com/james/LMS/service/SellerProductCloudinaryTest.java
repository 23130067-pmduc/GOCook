package com.james.LMS.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.james.LMS.enums.FileType;
import com.james.LMS.exception.SellerProductException;
import com.james.LMS.service.impl.CloudinaryServiceImpl;
import java.io.IOException;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

class SellerProductCloudinaryTest {
  @Test
  void avatarKeepsExistingFolderAndReturnContract() throws Exception {
    Cloudinary cloudinary = mock(Cloudinary.class);
    Uploader uploader = mock(Uploader.class);
    when(cloudinary.uploader()).thenReturn(uploader);
    when(uploader.upload(any(), anyMap()))
        .thenReturn(Map.of("secure_url", "https://res.cloudinary.com/demo/avatar.png"));
    var service = new CloudinaryServiceImpl(cloudinary);
    byte[] bytes = {1, 2, 3};
    assertThat(service.uploadFile(bytes, FileType.IMAGE))
        .isEqualTo("https://res.cloudinary.com/demo/avatar.png");
    verify(uploader).upload(eq(bytes), eq(Map.of("folder", "users", "resource_type", "image")));
  }

  @Test
  void menusUseDedicatedServerGeneratedIdsAndSecureUrls() throws Exception {
    Cloudinary cloudinary = mock(Cloudinary.class);
    Uploader uploader = mock(Uploader.class);
    when(cloudinary.uploader()).thenReturn(uploader);
    when(uploader.upload(any(), anyMap()))
        .thenReturn(Map.of("secure_url", "https://res.cloudinary.com/demo/image/upload/meal.png"));
    var result = new CloudinaryServiceImpl(cloudinary).uploadMenuImage(new byte[] {1, 2, 3});
    assertThat(result.publicId()).startsWith("gocook/menus/");
    assertThat(result.url()).startsWith("https://res.cloudinary.com/");
  }

  @Test
  void failedUploadReturnsFriendlyErrorAndAttemptsCleanup() throws Exception {
    Cloudinary cloudinary = mock(Cloudinary.class);
    Uploader uploader = mock(Uploader.class);
    when(cloudinary.uploader()).thenReturn(uploader);
    when(uploader.upload(any(), anyMap())).thenThrow(new IOException("offline"));
    when(uploader.destroy(any(), anyMap())).thenReturn(Map.of("result", "not found"));
    assertThatThrownBy(() -> new CloudinaryServiceImpl(cloudinary).uploadMenuImage(new byte[] {1}))
        .isInstanceOf(SellerProductException.class);
    ArgumentCaptor<String> id = ArgumentCaptor.forClass(String.class);
    verify(uploader).destroy(id.capture(), anyMap());
    assertThat(id.getValue()).startsWith("gocook/menus/");
  }

  @Test
  void cleanupCannotDeleteAvatarOrAnotherFolder() throws Exception {
    Cloudinary cloudinary = mock(Cloudinary.class);
    Uploader uploader = mock(Uploader.class);
    when(cloudinary.uploader()).thenReturn(uploader);
    new CloudinaryServiceImpl(cloudinary).deleteMenuImage("users/avatar");
    verify(uploader, never()).destroy(any(), anyMap());
  }
}
