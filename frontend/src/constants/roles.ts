export const ROLES = {
  USER: 'ROLE_USER',
  SELLER: 'ROLE_INSTRUCTOR',
  ADMIN: 'ROLE_SYSTEM_ADMIN',
  COMPANY_ADMIN: 'ROLE_COMPANY_ADMIN',
} as const;

export type SecurityRole = (typeof ROLES)[keyof typeof ROLES];
