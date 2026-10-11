import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/auth/useAuth';
import { SiteLayout } from '../../layouts/SiteLayout';

export function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      await logout();
      if (alive) {
        setDone(true);
        window.setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 300);
      }
    })();
    return () => { alive = false; };
  }, [logout, navigate]);

  return (
    <SiteLayout>
      <main id="main"><div className="container section"><section className="card empty"><h1>Đăng xuất</h1><p className="muted">{done ? 'Đã đăng xuất. Đang chuyển về trang đăng nhập...' : 'Đang đăng xuất...'}</p></section></div></main>
    </SiteLayout>
  );
}
