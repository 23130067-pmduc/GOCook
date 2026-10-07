import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LegacyPage from './pages/LegacyPage';
import AccountPage from './pages/AccountPage';
import { LoginPage, RegisterPage, VerifyEmailPage, ForgotPasswordPage, ResetPasswordPage, LogoutPage } from './pages/AuthPages';
import { ProtectedRoute } from './components/RouteGuards';
import {
  AdminDashboardPage, AdminUsersPage, AdminUserEditPage,
  AdminProductsPage, AdminProductNewPage, AdminProductEditPage,
  AdminOrdersPage, AdminOrderDetailPage, AdminStatisticsPage
} from './pages/AdminPages';

const publicLegacy = ['/', '/chefs', '/chef-detail', '/chef-an-nhien', '/menus', '/menu-detail', '/menu-vegetarian', '/offers', '/help', '/request', '/pages', '/quotes', '/review', '/matching', '/become-chef', '/chat'];
const customerLegacy = ['/cart', '/cart-empty', '/cart-vegetarian', '/checkout', '/checkout-vegetarian', '/order-detail', '/orders', '/success', '/success-vegetarian', '/tracking'];
const sellerLegacy = ['/seller', '/seller/order-detail', '/seller/orders', '/seller/product-edit', '/seller/product-new', '/seller/products', '/seller/revenue', '/seller/schedule'];

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/verify-email" element={<VerifyEmailPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/logout" element={<LogoutPage />} />

    <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
    {publicLegacy.map(path => <Route key={path} path={path} element={<LegacyPage path={path} />} />)}
    {customerLegacy.map(path => <Route key={path} path={path} element={<ProtectedRoute><LegacyPage path={path} /></ProtectedRoute>} />)}
    {sellerLegacy.map(path => <Route key={path} path={path} element={<ProtectedRoute role="ROLE_INSTRUCTOR"><LegacyPage path={path} /></ProtectedRoute>} />)}

    <Route path="/admin" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminDashboardPage /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminUsersPage /></ProtectedRoute>} />
    <Route path="/admin/user-edit" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminUserEditPage /></ProtectedRoute>} />
    <Route path="/admin/products" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminProductsPage /></ProtectedRoute>} />
    <Route path="/admin/product-new" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminProductNewPage /></ProtectedRoute>} />
    <Route path="/admin/product-edit" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminProductEditPage /></ProtectedRoute>} />
    <Route path="/admin/orders" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminOrdersPage /></ProtectedRoute>} />
    <Route path="/admin/order-detail" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminOrderDetailPage /></ProtectedRoute>} />
    <Route path="/admin/statistics" element={<ProtectedRoute role="ROLE_SYSTEM_ADMIN"><AdminStatisticsPage /></ProtectedRoute>} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
