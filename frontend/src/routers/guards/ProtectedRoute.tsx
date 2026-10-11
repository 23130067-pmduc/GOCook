import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';

interface ProtectedRouteProps {
  children?: ReactNode;
  role?: string;
}

/**
 * Route guard only. It does not know page UI or business logic.
 * Authentication state comes from AuthContext through useAuth().
 */
export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { loading, isAuthenticated, roles } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main id="main">
        <div className="container section">
          <div className="card">Đang kiểm tra phiên đăng nhập...</div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  if (role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
