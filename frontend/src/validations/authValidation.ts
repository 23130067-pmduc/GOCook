export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validatePasswordPair(password: string, confirmPassword: string): string | null {
  if (password.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.';
  if (password !== confirmPassword) return 'Mật khẩu nhập lại không khớp.';
  return null;
}

export function normalizeOtp(value: string): string {
  return value.replace(/\D/g, '').slice(0, 6);
}
