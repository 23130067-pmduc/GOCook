export const appConfig = {
  appName: 'GO Cook',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  pageSize: 10,
} as const;
