(() => {
  const ctx = window.GOCOOK_CONTEXT_PATH || "";
  const byId = (id) => document.getElementById(id);

  const ERROR_MESSAGES = {
    "1000": "Không tìm thấy tài khoản với email này.",
    "1003": "Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.",
    "1004": "Mật khẩu xác nhận không khớp.",
    "1005": "Email này đã được đăng ký.",
    "1006": "Bạn vừa yêu cầu mã khôi phục. Vui lòng đợi một chút rồi thử lại.",
    "1007": "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.",
    "1008": "Mã OTP không đúng.",
    "1012": "Email hoặc mật khẩu không đúng.",
    "1013": "Email chưa được xác nhận. Vui lòng nhập mã OTP đã gửi tới email.",
    "1014": "Email này đã được xác nhận.",
    "1015": "Vui lòng đợi trước khi yêu cầu gửi lại mã xác nhận."
  };

  function showMessage(message, type = "error") {
    let box = document.querySelector(".auth-message");

    if (!box) {
      box = document.createElement("div");
      box.className = "auth-message";
      const target = document.querySelector(
        "#login-form, .auth-form form, .logout-card, .card.empty, main"
      );
      if (target) target.prepend(box);
      else document.body.prepend(box);
    }

    box.className = `auth-message ${type}`;
    box.textContent = message;
  }

  function setBusy(button, busy, busyText) {
    if (!button) return;
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent.trim();
    }
    button.disabled = busy;
    button.textContent = busy ? busyText : button.dataset.originalText;
  }

  async function parseResponse(response) {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  }

  function responseErrorCode(data) {
    return data?.metadata?.errorCode || data?.errorCode || null;
  }

  function errorMessage(data, fallback) {
    const code = responseErrorCode(data);
    if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
    if (typeof data?.metadata?.message === "string" && data.metadata.message.trim()) {
      return data.metadata.message;
    }
    if (data?.metadata && typeof data.metadata === "object") {
      const firstMessage = Object.values(data.metadata).find(
        (value) => typeof value === "string" && value.trim()
      );
      if (firstMessage) return firstMessage;
    }
    return fallback;
  }

  function applicationFailed(data) {
    return data?.success === false || data?.isSuccess === false;
  }

  function normalizedEmail(value) {
    return (value || "").trim().toLowerCase();
  }

  async function login(button) {
    const email = normalizedEmail(byId("login-email")?.value);
    const password = byId("login-password")?.value || "";

    if (!email || !password) {
      showMessage("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setBusy(button, true, "Đang đăng nhập...");
    try {
      const response = await fetch(`${ctx}/api/v2/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        const code = responseErrorCode(data);
        showMessage(errorMessage(data, "Email hoặc mật khẩu không đúng."));
        if (code === "1013") {
          window.setTimeout(() => {
            window.location.href = `${ctx}/verify-email?email=${encodeURIComponent(email)}`;
          }, 900);
        }
        return;
      }

      localStorage.setItem("gocook:login", Date.now().toString());

      let redirectUrl = `${ctx}/`;
      let successMessage = "Đăng nhập thành công. Đang chuyển về trang chủ...";

      try {
        const profileResponse = await fetch(`${ctx}/api/v1/users/profile`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
          cache: "no-store"
        });

        if (profileResponse.ok) {
          const profileData = await parseResponse(profileResponse);
          const roles = Array.isArray(profileData?.metadata?.roles)
            ? profileData.metadata.roles
            : [];

          if (roles.includes("ROLE_SYSTEM_ADMIN")) {
            redirectUrl = `${ctx}/admin`;
            successMessage = "Đăng nhập Admin thành công. Đang chuyển đến trang quản trị...";
          }
        }
      } catch (profileError) {
        console.debug("Không lấy được role sau đăng nhập, chuyển về trang chủ:", profileError);
      }

      showMessage(successMessage, "success");
      window.setTimeout(() => window.location.replace(redirectUrl), 250);
    } catch (error) {
      console.error("GO Cook login error:", error);
      showMessage("Không thể kết nối máy chủ. Hãy kiểm tra Spring Boot đang chạy.");
    } finally {
      setBusy(button, false);
    }
  }

  async function register(button) {
    const username = byId("register-name")?.value.trim();
    const email = normalizedEmail(byId("register-email")?.value);
    const password = byId("register-password")?.value || "";
    const confirmPassword = byId("confirm-password")?.value || "";
    const terms = document.querySelector('input[name="terms"]')?.checked;

    if (!username || !email || !password || !confirmPassword) {
      showMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password.length < 8) {
      showMessage("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      showMessage("Mật khẩu nhập lại không khớp.");
      return;
    }
    if (!terms) {
      showMessage("Bạn cần đồng ý với điều khoản sử dụng dịch vụ.");
      return;
    }

    setBusy(button, true, "Đang tạo tài khoản...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        showMessage(errorMessage(data, "Không thể tạo tài khoản."));
        return;
      }

      showMessage("Đăng ký thành công. Hãy kiểm tra email để lấy mã xác nhận.", "success");
      window.setTimeout(() => {
        window.location.replace(`${ctx}/verify-email?email=${encodeURIComponent(email)}`);
      }, 450);
    } catch (error) {
      console.error("GO Cook register error:", error);
      showMessage("Không thể kết nối máy chủ. Hãy kiểm tra Spring Boot đang chạy.");
    } finally {
      setBusy(button, false);
    }
  }

  async function verifyEmail(button) {
    const email = normalizedEmail(byId("verify-email-address")?.value);
    const otp = (byId("verify-email-otp")?.value || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      showMessage("Vui lòng nhập email và mã OTP gồm 6 chữ số.");
      return;
    }

    setBusy(button, true, "Đang xác nhận...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        showMessage(errorMessage(data, "Không thể xác nhận email."));
        return;
      }

      showMessage("Xác nhận email thành công. Đang chuyển sang đăng nhập...", "success");
      window.setTimeout(() => window.location.replace(`${ctx}/login?verified=1`), 450);
    } catch (error) {
      console.error("GO Cook verify email error:", error);
      showMessage("Không thể kết nối máy chủ.");
    } finally {
      setBusy(button, false);
    }
  }

  async function resendVerification(button) {
    const email = normalizedEmail(byId("verify-email-address")?.value);
    if (!email) {
      showMessage("Vui lòng nhập email cần xác nhận.");
      return;
    }

    setBusy(button, true, "Đang gửi lại...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        showMessage(errorMessage(data, "Không thể gửi lại mã xác nhận."));
        return;
      }
      showMessage("Đã gửi lại mã xác nhận. Vui lòng kiểm tra email.", "success");
    } catch (error) {
      console.error("GO Cook resend verification error:", error);
      showMessage("Không thể kết nối máy chủ.");
    } finally {
      setBusy(button, false);
    }
  }

  async function forgotPassword(button) {
    const email = normalizedEmail(byId("recovery-email")?.value);
    if (!email) {
      showMessage("Vui lòng nhập email đã đăng ký.");
      return;
    }

    setBusy(button, true, "Đang gửi mã...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        showMessage(errorMessage(data, "Không thể gửi mã khôi phục."));
        return;
      }

      showMessage("Mã OTP đã được gửi. Đang chuyển sang bước xác minh...", "success");
      window.setTimeout(() => {
        window.location.replace(`${ctx}/reset-password?email=${encodeURIComponent(email)}`);
      }, 450);
    } catch (error) {
      console.error("GO Cook forgot password error:", error);
      showMessage("Không thể kết nối máy chủ.");
    } finally {
      setBusy(button, false);
    }
  }

  async function verifyResetOtp(button) {
    const email = normalizedEmail(byId("reset-email")?.value);
    const otp = (byId("reset-otp")?.value || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      showMessage("Vui lòng nhập email và mã OTP gồm 6 chữ số.");
      return;
    }

    setBusy(button, true, "Đang xác minh...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        showMessage(errorMessage(data, "Không thể xác minh OTP."));
        return;
      }

      const token = data?.metadata?.resetPasswordToken;
      if (!token) {
        showMessage("Máy chủ không trả về mã đặt lại mật khẩu.");
        return;
      }

      sessionStorage.setItem(`gocook:reset-token:${email}`, token);
      showPasswordStep();
      showMessage("OTP hợp lệ. Hãy nhập mật khẩu mới.", "success");
    } catch (error) {
      console.error("GO Cook verify reset OTP error:", error);
      showMessage("Không thể kết nối máy chủ.");
    } finally {
      setBusy(button, false);
    }
  }

  async function resetPassword(button) {
    const email = normalizedEmail(byId("reset-email")?.value);
    const newPassword = byId("new-password")?.value || "";
    const confirmPassword = byId("password-confirmation")?.value || "";
    const resetPasswordToken = sessionStorage.getItem(`gocook:reset-token:${email}`);

    if (!resetPasswordToken) {
      showMessage("Bạn cần xác minh OTP trước khi đặt mật khẩu mới.");
      return;
    }
    if (newPassword.length < 8) {
      showMessage("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setBusy(button, true, "Đang lưu...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ resetPasswordToken, newPassword, confirmPassword })
      });
      const data = await parseResponse(response);

      if (!response.ok || applicationFailed(data)) {
        showMessage(errorMessage(data, "Không thể đặt lại mật khẩu."));
        return;
      }

      sessionStorage.removeItem(`gocook:reset-token:${email}`);
      showMessage("Đặt lại mật khẩu thành công. Đang chuyển sang đăng nhập...", "success");
      window.setTimeout(() => window.location.replace(`${ctx}/login?reset=1`), 450);
    } catch (error) {
      console.error("GO Cook reset password error:", error);
      showMessage("Không thể kết nối máy chủ.");
    } finally {
      setBusy(button, false);
    }
  }

  async function logout(button) {
    setBusy(button, true, "Đang đăng xuất...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" }
      });

      if (!response.ok && response.status !== 401) {
        const data = await parseResponse(response);
        showMessage(errorMessage(data, "Không thể đăng xuất."));
        return;
      }

      localStorage.setItem("gocook:logout", Date.now().toString());
      window.location.replace(`${ctx}/login`);
    } catch (error) {
      console.error("GO Cook logout error:", error);
      showMessage("Không thể kết nối máy chủ. Hãy kiểm tra Spring Boot đang chạy.");
    } finally {
      setBusy(button, false);
    }
  }

  function showPasswordStep() {
    const otpStep = byId("reset-otp-step");
    const passwordStep = byId("reset-password-step");
    if (otpStep) otpStep.hidden = true;
    if (passwordStep) passwordStep.hidden = false;
  }

  function bindSubmitAction(selector, handler) {
    const button = document.querySelector(selector);
    if (!button) return;
    const form = button.closest("form");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(button);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("verified") === "1") {
      showMessage("Xác nhận email thành công. Bạn có thể đăng nhập.", "success");
      window.history.replaceState({}, document.title, `${ctx}/login`);
    } else if (params.get("reset") === "1") {
      showMessage("Đặt lại mật khẩu thành công. Hãy đăng nhập bằng mật khẩu mới.", "success");
      window.history.replaceState({}, document.title, `${ctx}/login`);
    } else if (params.get("registered") === "1") {
      showMessage("Đăng ký thành công.", "success");
      window.history.replaceState({}, document.title, `${ctx}/login`);
    }

    const verifyEmailAddress = byId("verify-email-address");
    if (verifyEmailAddress && params.get("email")) {
      verifyEmailAddress.value = params.get("email");
    }

    const resetEmail = byId("reset-email");
    if (resetEmail && params.get("email")) {
      resetEmail.value = params.get("email");
      if (sessionStorage.getItem(`gocook:reset-token:${normalizedEmail(resetEmail.value)}`)) {
        showPasswordStep();
      }
    }

    bindSubmitAction('[data-action="login"]', login);
    bindSubmitAction('[data-action="register"]', register);
    bindSubmitAction('[data-action="verify-email"]', verifyEmail);
    bindSubmitAction('[data-action="forgot-password"]', forgotPassword);
    bindSubmitAction('[data-action="verify-reset-otp"]', verifyResetOtp);
    bindSubmitAction('[data-action="reset-password"]', resetPassword);

    document
      .querySelector('[data-action="resend-verification"]')
      ?.addEventListener("click", () =>
        resendVerification(document.querySelector('[data-action="resend-verification"]'))
      );

    const logoutButton = document.querySelector('[data-action="logout"]');
    logoutButton?.addEventListener("click", () => logout(logoutButton));
  });
})();
