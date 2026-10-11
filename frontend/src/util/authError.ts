import { ApiError } from '../clients/httpClient';

const ERROR_MESSAGES: Record<string, string> = {
  '1000': 'Không tìm thấy tài khoản với email này.',
  '1003': 'Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
  '1004': 'Mật khẩu xác nhận không khớp.',
  '1005': 'Email này đã được đăng ký.',
  '1006': 'Bạn vừa yêu cầu mã khôi phục. Vui lòng đợi rồi thử lại.',
  '1007': 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.',
  '1008': 'Mã OTP không đúng.',
  '1012': 'Email hoặc mật khẩu không đúng.',
  '1013': 'Email chưa được xác nhận.',
  '1014': 'Email này đã được xác nhận.',
  '1015': 'Vui lòng đợi trước khi yêu cầu gửi lại mã.',
};

export function authErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    if (error.code && ERROR_MESSAGES[error.code]) return ERROR_MESSAGES[error.code];
    return error.message || fallback;
  }
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}
