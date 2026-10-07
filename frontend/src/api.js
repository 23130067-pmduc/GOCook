export async function apiRequest(url, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  const text = await response.text();
  let data = {};
  if (text) {
    try { data = JSON.parse(text); } catch { data = { message: text }; }
  }

  if (!response.ok || data?.isSuccess === false || data?.success === false) {
    const metadata = data?.metadata;
    const message =
      metadata?.message ||
      data?.message ||
      data?.detail ||
      `HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.code = metadata?.errorCode || data?.errorCode || null;
    error.payload = data;
    throw error;
  }

  return data;
}

export function unwrap(response) {
  return response?.metadata ?? response;
}

export function money(value) {
  const n = Number(value || 0);
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

export function dateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short', timeStyle: 'short'
  }).format(date);
}
