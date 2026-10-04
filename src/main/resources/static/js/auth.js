(() => {
  const ctx = window.GOCOOK_CONTEXT_PATH || "";

  const byId = (id) => document.getElementById(id);

  function showMessage(message, type = "error") {
    let box = document.querySelector(".auth-message");
    if (!box) {
      box = document.createElement("div");
      box.className = "auth-message";
      const form = document.querySelector(".auth-form form, .logout-card, main");
      if (form) {
        form.prepend(box);
      } else {
        document.body.prepend(box);
      }
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

  function errorMessage(data, fallback) {
    if (data?.metadata?.message) return data.metadata.message;
    if (data?.metadata && typeof data.metadata === "object") {
      const first = Object.values(data.metadata)[0];
      if (typeof first === "string") return first;
    }
    return fallback;
  }

  async function login(button) {
    const email = byId("login-email")?.value.trim();
    const password = byId("login-password")?.value || "";

    if (!email || !password) {
      showMessage("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setBusy(button, true, "Đang đăng nhập...");
    try {
      const response = await fetch(`${ctx}/api/v2/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      const data = await parseResponse(response);

      if (!response.ok || data.isSuccess === false) {
        showMessage(errorMessage(data, "Email hoặc mật khẩu không đúng."));
        return;
      }

      showMessage("Đăng nhập thành công.", "success");
      window.location.href = `${ctx}/account`;
    } catch (error) {
      showMessage("Không thể kết nối máy chủ. Hãy kiểm tra Spring Boot đang chạy.");
    } finally {
      setBusy(button, false);
    }
  }

  async function register(button) {
    const username = byId("register-name")?.value.trim();
    const email = byId("register-email")?.value.trim();
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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password })
      });
      const data = await parseResponse(response);

      if (!response.ok || data.isSuccess === false) {
        showMessage(errorMessage(data, "Không thể tạo tài khoản."));
        return;
      }

      showMessage("Đăng ký thành công.", "success");
      window.setTimeout(() => {
        window.location.href = `${ctx}/verify-email`;
      }, 700);
    } catch (error) {
      showMessage("Không thể kết nối máy chủ. Hãy kiểm tra Spring Boot đang chạy.");
    } finally {
      setBusy(button, false);
    }
  }

  async function logout(button) {
    setBusy(button, true, "Đang đăng xuất...");
    try {
      const response = await fetch(`${ctx}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include"
      });

      // Even if the session is already expired, returning to login is the safest UX.
      if (!response.ok && response.status !== 401) {
        const data = await parseResponse(response);
        showMessage(errorMessage(data, "Không thể đăng xuất."));
        return;
      }

      window.location.href = `${ctx}/login`;
    } catch (error) {
      showMessage("Không thể kết nối máy chủ. Hãy kiểm tra Spring Boot đang chạy.");
    } finally {
      setBusy(button, false);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector('[data-action="login"]');
    const registerButton = document.querySelector('[data-action="register"]');
    const logoutButton = document.querySelector('[data-action="logout"]');

    if (loginButton) {
      const form = loginButton.closest("form");
      form?.addEventListener("submit", (event) => {
        event.preventDefault();
        login(loginButton);
      });
    }

    if (registerButton) {
      const form = registerButton.closest("form");
      form?.addEventListener("submit", (event) => {
        event.preventDefault();
        register(registerButton);
      });
    }

    logoutButton?.addEventListener("click", () => logout(logoutButton));
  });
})();
