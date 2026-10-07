(() => {
  const ctx = window.GOCOOK_CONTEXT_PATH || "";
  const ADMIN_ROLE = "ROLE_SYSTEM_ADMIN";

  function removeAdminLinks() {
    document.querySelectorAll(".admin-panel-link, .admin-panel-mobile-link").forEach((link) => {
      link.remove();
    });
  }

  function addAdminLinks() {
    document.querySelectorAll(".header-actions").forEach((headerActions) => {
      if (headerActions.querySelector(".admin-panel-link")) return;

      const loginLink = headerActions.querySelector("a.login-link");
      if (!loginLink) return;

      const adminLink = document.createElement("a");
      adminLink.className = "admin-panel-link text-link small";
      adminLink.href = `${ctx}/admin`;
      adminLink.textContent = "Trang quản trị";
      adminLink.title = "Mở trang quản trị";

      headerActions.insertBefore(adminLink, loginLink);
    });

    document.querySelectorAll("details.mobile-menu nav").forEach((mobileNav) => {
      if (mobileNav.querySelector(".admin-panel-mobile-link")) return;

      const adminLink = document.createElement("a");
      adminLink.className = "admin-panel-mobile-link";
      adminLink.href = `${ctx}/admin`;
      adminLink.textContent = "Trang quản trị";

      const accountLink = mobileNav.querySelector(`a[href="${ctx}/account"]`);
      if (accountLink) {
        mobileNav.insertBefore(adminLink, accountLink);
      } else {
        mobileNav.appendChild(adminLink);
      }
    });
  }

  function showLoggedOut() {
    removeAdminLinks();

    document.querySelectorAll("a.login-link").forEach((link) => {
      link.textContent = "Đăng nhập";
      link.href = `${ctx}/login`;
      link.title = "Đăng nhập";
    });
  }

  function showLoggedIn(profile) {
    const label = profile?.username || profile?.email || "Tài khoản";
    const roles = Array.isArray(profile?.roles) ? profile.roles : [];
    const isAdmin = roles.includes(ADMIN_ROLE);

    document.querySelectorAll("a.login-link").forEach((link) => {
      link.textContent = label;
      link.href = `${ctx}/account`;
      link.title = "Mở tài khoản";
    });

    if (isAdmin) {
      addAdminLinks();
    } else {
      removeAdminLinks();
    }
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
