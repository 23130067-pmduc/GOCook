(() => {
  const ctx = window.GOCOOK_CONTEXT_PATH || "";

  function getCookie(name) {
    const prefix = `${encodeURIComponent(name)}=`;
    return document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix))
      ?.slice(prefix.length) || null;
  }

  async function updateHeader() {
    if (getCookie("validate-login") !== "true") return;

    try {
      const response = await fetch(`${ctx}/api/v1/users/profile`, {
        credentials: "include",
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) return;
      const data = await response.json();
      const profile = data.metadata || {};
      const label = profile.username || "Tài khoản";

      document.querySelectorAll("a.login-link").forEach((link) => {
        link.textContent = label;
        link.href = `${ctx}/account`;
      });
    } catch (_) {
      // Keep the original "Đăng nhập" link when profile cannot be loaded.
    }
  }

  document.addEventListener("DOMContentLoaded", updateHeader);
})();
