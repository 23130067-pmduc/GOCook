import { ApiError, httpRequest } from "./httpClient";
import type {
  SellerSchedule,
  SellerSlot,
  SellerSlotInput,
} from "../types/sellerSchedule";
const path = "/api/seller/schedules";
export const sellerScheduleClient = {
  list: (from: string, to: string, signal?: AbortSignal) =>
    httpRequest<SellerSchedule>(
      `${path}?${new URLSearchParams({ from, to })}`,
      { signal },
    ),
  create: (slot: SellerSlotInput) =>
    httpRequest<SellerSlot>(path, {
      method: "POST",
      body: JSON.stringify(slot),
    }),
  status: (slot: SellerSlot) =>
    httpRequest<SellerSlot>(`${path}/${slot.id}/availability`, {
      method: "PATCH",
      body: JSON.stringify({
        available: !slot.available,
        version: slot.version,
      }),
    }),
  remove: (slot: SellerSlot) =>
    httpRequest<void>(`${path}/${slot.id}?version=${slot.version}`, {
      method: "DELETE",
    }),
};
export function sellerScheduleError(error: unknown): string {
  if (error instanceof ApiError && error.status === 401)
    return "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
  if (error instanceof ApiError && error.status === 403)
    return "Tài khoản không có quyền quản lý lịch phục vụ.";
  return error instanceof Error
    ? error.message
    : "Không thể kết nối hệ thống. Vui lòng thử lại.";
}
