import { Navigate, useRoutes, type RouteObject } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { adminRoutes } from './routes/adminRoutes';
import { authRoutes } from './routes/authRoutes';
import { customerRoutes } from './routes/customerRoutes';
import { publicRoutes } from './routes/publicRoutes';
import { sellerRoutes } from './routes/sellerRoutes';

const routes: RouteObject[] = [
  ...publicRoutes,
  ...authRoutes,
  ...customerRoutes,
  ...sellerRoutes,
  ...adminRoutes,
  { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
];

/**
 * Composition root for frontend routes only.
 * Domain-specific route definitions live in routers/routes/*.
 */
export function AppRouter() {
  return useRoutes(routes);
}
