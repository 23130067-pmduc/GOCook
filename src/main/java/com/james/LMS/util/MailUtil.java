package com.james.LMS.util;

import com.james.LMS.dto.MessageMailDTO;

public final class MailUtil {

  private MailUtil() {}

  public static MessageMailDTO buildMessageMailDTOForEmailVerification(String to, String otp) {
    String content =
        "<h2>Xác nhận email GO Cook</h2>"
            + "<p>Mã xác nhận tài khoản của bạn là:</p>"
            + "<p style=\"font-size:28px;font-weight:700;letter-spacing:6px\">"
            + otp
            + "</p>"
            + "<p>Mã có hiệu lực trong 10 phút. Không chia sẻ mã này cho người khác.</p>";

    return MessageMailDTO.builder()
        .to(to)
        .subject("GO Cook - Mã xác nhận email")
        .content(content)
        .build();
  }

  public static MessageMailDTO buildMessageMailDTOForOTP(String to, String otp) {
    String content =
        "<h2>Khôi phục mật khẩu GO Cook</h2>"
            + "<p>Mã OTP đặt lại mật khẩu của bạn là:</p>"
            + "<p style=\"font-size:28px;font-weight:700;letter-spacing:6px\">"
            + otp
            + "</p>"
            + "<p>Mã có hiệu lực trong 10 phút. Không chia sẻ mã này cho người khác.</p>";

    return MessageMailDTO.builder()
        .to(to)
        .subject("GO Cook - Mã OTP đặt lại mật khẩu")
        .content(content)
        .build();
  }
}
