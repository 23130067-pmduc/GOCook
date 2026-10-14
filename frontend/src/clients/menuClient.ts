import { httpRequest } from "./httpClient";
import type { MenuDetail } from "../types/menu";

const path = "/api/products";

export const menuClient = {
  get: (id: string, signal?: AbortSignal) =>
    httpRequest<MenuDetail>(`${path}/${encodeURIComponent(id)}`, { signal }),
};
