import type { PageResponse } from './api';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  roleLabel?: string;
  active: boolean;
  createdAt?: number;
  createdAtDisplay?: string;
}

export interface AdminProduct {
  id: number;
  name: string;
  category: string;
  unitPrice: number;
  minGuests: number;
  maxGuests: number;
  dishItems?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  status: string;
  displayCode?: string;
}

export interface AdminOrder {
  id: number;
  orderCode: string;
  customerName: string;
  customerEmail?: string;
  productName: string;
  chefName?: string;
  serviceAddress?: string;
  guestCount: number;
  scheduledAt?: string;
  scheduledAtDisplay?: string;
  totalAmount: number;
  status: string;
  customerNote?: string;
  internalNote?: string;
}

export interface DashboardResponse {
  userCount: number;
  productCount: number;
  orderCount: number;
  completedRevenue: number;
  recentOrders: AdminOrder[];
}

export interface UsersResponse extends PageResponse<AdminUser> {
  roles: string[];
}

export interface ProductsResponse extends PageResponse<AdminProduct> {
  categories: string[];
  statuses: string[];
}

export interface OrdersResponse extends PageResponse<AdminOrder> {
  statuses: string[];
}

export interface StatisticsResponse {
  from: string;
  to: string;
  revenue: number;
  orderCount: number;
  chefCount: number;
  userCount: number;
  monthlyRevenue: Array<{ month: string; label: string; revenue: number }>;
  statusCounts: Record<string, number>;
}
