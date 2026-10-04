package com.james.LMS.util;

import com.james.LMS.dto.MessageMailDTO;

public final class MailUtil {

  private MailUtil() {}

  public static MessageMailDTO buildMessageMailDTOForNewUser(String to) {
    return MessageMailDTO.builder()
        .to(to)
        .subject("GO Cook - Đăng ký tài khoản thành công")
        .content(
            "<h2>Chào mừng bạn đến với GO Cook!</h2>"
                + "<p>Tài khoản của bạn đã được đăng ký thành công.</p>"
                + "<p>Bạn có thể quay lại GO Cook và đăng nhập bằng email đã đăng ký.</p>")
        .build();
  }

  public static MessageMailDTO buildMessageMailDTOForOTP(String to, String otp) {
    String content = "<p>Mã OTP của bạn là: <strong>" + otp + "</strong></p>";
    return MessageMailDTO.builder()
        .to(to)
        .subject("GO Cook - Mã OTP đặt lại mật khẩu")
        .content(content)
        .build();
  }
}
