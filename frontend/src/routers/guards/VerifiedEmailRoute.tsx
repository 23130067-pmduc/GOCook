import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/auth/useAuth';

interface VerifiedEmailRouteProps {
  children?: ReactNode;
}

/**
 * Step-up verification guard for transactional customer flows.
 * Browsing/profile pages do not use this guard.
 *
 * IMPORTANT: this is UX protection only. The backend create-booking/create-order
 * service must also call the server-side e-mail verification guard before writing data.
 */
export function VerifiedEmailRoute({ children }: VerifiedEmailRouteProps) {
  const { loading, isAuthenticated, profile, emailVerified } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main id="main">
        <div className="container section">
          <div className="card">Đang kiểm tra tài khoản...</div>
        </div>
      </main>
    );
  }

  const returnTo = `${location.pathname}${location.search}`;

  if (!isAuthenticated || !profile) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: returnTo }} />;
  }

  if (!emailVerified) {
    const params = new URLSearchParams({
      email: profile.email,
      returnTo,
      autoSend: '1',
      reason: 'transaction',
    });
    return <Navigate to={`${ROUTES.VERIFY_EMAIL}?${params.toString()}`} replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
