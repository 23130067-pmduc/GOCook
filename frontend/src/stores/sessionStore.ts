const RESET_TOKEN_PREFIX = 'gocook:reset-token:';

export const sessionStore = {
  getResetToken(email: string): string | null {
    return sessionStorage.getItem(`${RESET_TOKEN_PREFIX}${email.toLowerCase()}`);
  },
  setResetToken(email: string, token: string): void {
    sessionStorage.setItem(`${RESET_TOKEN_PREFIX}${email.toLowerCase()}`, token);
  },
  clearResetToken(email: string): void {
    sessionStorage.removeItem(`${RESET_TOKEN_PREFIX}${email.toLowerCase()}`);
  },
};
