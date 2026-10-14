import { ApiError, httpRequest } from "./httpClient";
import type { PageResponse } from "../types/api";
import type {
  SellerMenu,
  SellerMenuInput,
  SellerMenuStatus,
} from "../types/sellerMenu";

const path = "/api/seller/products";
export const sellerMenuClient = {
  list(
    params: {
      q?: string;
      status?: string;
      category?: string;
      page?: number;
      size?: number;
    },
    signal?: AbortSignal,
  ) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") search.set(key, String(value));
    });
    return httpRequest<PageResponse<SellerMenu>>(`${path}?${search}`, {
      signal,
    });
  },
  options: (signal?: AbortSignal) =>
    httpRequest<{ categories: string[]; statuses: SellerMenuStatus[] }>(
      `${path}/options`,
      { signal },
    ),
  get: (id: string, signal?: AbortSignal) =>
    httpRequest<SellerMenu>(`${path}/${encodeURIComponent(id)}`, { signal }),
  save(id: number | undefined, menu: SellerMenuInput, files: File[]) {
    const form = new FormData();
    form.append(
      "menu",
      new Blob([JSON.stringify(menu)], { type: "application/json" }),
    );
    files.forEach((file) => form.append("files", file));
    return httpRequest<SellerMenu>(id === undefined ? path : `${path}/${id}`, {
      method: id === undefined ? "POST" : "PUT",
      body: form,
    });
  },
  status: (menu: SellerMenu, status: SellerMenuStatus) =>
    httpRequest<SellerMenu>(`${path}/${menu.id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, version: menu.version }),
    }),
};

export function sellerMenuError(error: unknown): string {
  if (error instanceof ApiError && error.status === 401)
    return "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại rồi thử tiếp.";
  if (error instanceof ApiError && error.status === 403)
    return "Tài khoản không có quyền quản lý thực đơn.";
  return error instanceof Error
    ? error.message
    : "Không thể kết nối hệ thống. Vui lòng thử lại.";
}
