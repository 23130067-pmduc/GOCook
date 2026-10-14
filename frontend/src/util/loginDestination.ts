import { ROLES } from "../constants/roles";
import { ROUTES } from "../constants/routes";

export function accountDestination(roles: readonly string[]): string {
  if (roles.includes(ROLES.ADMIN)) return ROUTES.ADMIN;
  if (roles.includes(ROLES.SELLER)) return ROUTES.SELLER;
  return ROUTES.ACCOUNT;
}

export function loginDestination(
  roles: readonly string[],
  from?: string,
): string {
  const fallback =
    roles.includes(ROLES.ADMIN) || roles.includes(ROLES.SELLER)
      ? accountDestination(roles)
      : ROUTES.HOME;
  if (
    !from ||
    !from.startsWith("/") ||
    from.startsWith("//") ||
    from.includes("\\")
  )
    return fallback;
  const pathname = from.split(/[?#]/)[0];
  if (/^\/admin(?:\/|$)/.test(pathname) && !roles.includes(ROLES.ADMIN))
    return fallback;
  if (/^\/seller(?:\/|$)/.test(pathname) && !roles.includes(ROLES.SELLER))
    return fallback;
  if (
    [ROUTES.LOGIN, ROUTES.LOGOUT, ROUTES.REGISTER].some(
      (route) => route === pathname,
    )
  )
    return fallback;
  return from;
}
