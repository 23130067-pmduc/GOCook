import { appConfig } from '../config/appConfig';
import type { BaseResponse } from '../types/api';

export class ApiError extends Error {
  status: number;
  code: string | null;
  payload: unknown;

  constructor(message: string, status: number, code: string | null, payload: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

export async function httpRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  const isFormData = options.body instanceof FormData;

  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const raw = await response.text();
  let data: any = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = { message: raw };
    }
  }

  if (!response.ok || data?.success === false || data?.isSuccess === false) {
    const metadata = data?.metadata;
    const message = metadata?.message || data?.message || data?.detail || `HTTP ${response.status}`;
    throw new ApiError(message, response.status, metadata?.errorCode || data?.errorCode || null, data);
  }

  return data as T;
}

export function unwrap<T>(response: BaseResponse<T> | T): T {
  if (response && typeof response === 'object' && 'metadata' in (response as object)) {
    return (response as BaseResponse<T>).metadata as T;
  }
  return response as T;
}
