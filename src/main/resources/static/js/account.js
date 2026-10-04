(() => {
  const ctx = window.GOCOOK_CONTEXT_PATH || "";

  function initials(name) {
    if (!name) return "--";
    return name
      .trim()
      .split(/\s+/)
      .slice(-2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }

  async function loadProfile() {
    try {
      const response = await fetch(`${ctx}/api/v1/users/profile`, {
        method: "GET",
        credentials: "include",
        headers: { "Accept": "application/json" }
      });

      if (response.status === 401 || response.status === 403) {
        window.location.href = `${ctx}/login`;
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const profile = data.metadata || {};
      const username = profile.username || "Người dùng GO Cook";
      const email = profile.email || "";

      const displayName = document.getElementById("profile-display-name");
      const summary = document.getElementById("profile-summary");
      const avatar = document.getElementById("profile-avatar");
      const fullName = document.getElementById("full-name");
      const emailInput = document.getElementById("email");

      if (displayName) displayName.textContent = username;
      if (summary) summary.textContent = email ? `Tài khoản khách hàng · ${email}` : "Tài khoản khách hàng";
      if (avatar) avatar.textContent = initials(username);
      if (fullName) fullName.value = username;
      if (emailInput) emailInput.value = email;
    } catch (error) {
      const displayName = document.getElementById("profile-display-name");
      const summary = document.getElementById("profile-summary");
      if (displayName) displayName.textContent = "Không tải được hồ sơ";
      if (summary) summary.textContent = "Vui lòng tải lại trang hoặc đăng nhập lại.";
    }
  }

  document.addEventListener("DOMContentLoaded", loadProfile);
})();
