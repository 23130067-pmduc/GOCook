(() => {
  const ctx = window.GOCOOK_CONTEXT_PATH || "";

  function showLoggedOut() {
    document.querySelectorAll("a.login-link").forEach((link) => {
      link.textContent = "Đăng nhập";
      link.href = `${ctx}/login`;
      link.title = "Đăng nhập";
    });
  }

  function showLoggedIn(profile) {
    const label = profile?.username || profile?.email || "Tài khoản";

    document.querySelectorAll("a.login-link").forEach((link) => {
      link.textContent = label;
      link.href = `${ctx}/account`;
      link.title = "Mở tài khoản";
    });
  }

  async function updateHeader() {
    try {
      const response = await fetch(`${ctx}/api/v1/users/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json"
        },
        cache: "no-store"
      });

      if (!response.ok) {
        showLoggedOut();
        return;
      }

      const data = await response.json();
      showLoggedIn(data?.metadata || {});
    } catch (error) {
      showLoggedOut();
      console.debug("GO Cook session check failed:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", updateHeader);
  window.addEventListener("pageshow", updateHeader);
  window.addEventListener("focus", updateHeader);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateHeader();
    }
  });

  // Đồng bộ login/logout giữa nhiều tab.
  window.addEventListener("storage", (event) => {
    if (event.key === "gocook:logout") {
      showLoggedOut();
      return;
    }

    if (event.key === "gocook:login") {
      updateHeader();
    }
  });
})();
