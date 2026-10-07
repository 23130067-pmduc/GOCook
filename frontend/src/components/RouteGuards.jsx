import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children, role }) {
  const { loading, isAuthenticated, roles } = useAuth();
  const location = useLocation();
  if (loading) return <main id="main"><div className="container section"><div className="card">Đang kiểm tra phiên đăng nhập...</div></div></main>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  if (role && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}
