import { httpRequest, unwrap } from './httpClient';
import type { BaseResponse } from '../types/api';
import type { LoginPayload, RegisterPayload, ResetPasswordPayload, VerifyOtpPayload } from '../types/auth';
import type { UserProfile } from '../types/user';

export const authClient = {
  async login(payload: LoginPayload): Promise<void> {
    await httpRequest('/api/v2/users/login', { method: 'POST', body: JSON.stringify(payload) });
  },

  async register(payload: RegisterPayload): Promise<void> {
    await httpRequest('/api/v1/users/sign-up', { method: 'POST', body: JSON.stringify(payload) });
  },

  async verifyEmail(payload: VerifyOtpPayload): Promise<void> {
    await httpRequest('/api/v1/users/verify-email', { method: 'POST', body: JSON.stringify(payload) });
  },

  async resendVerification(email: string): Promise<void> {
    await httpRequest('/api/v1/users/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async forgotPassword(email: string): Promise<void> {
    await httpRequest('/api/v1/users/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async verifyResetOtp(payload: VerifyOtpPayload): Promise<string> {
    const response = await httpRequest<BaseResponse<{ resetPasswordToken: string }>>('/api/v1/users/verify-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return unwrap(response).resetPasswordToken;
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await httpRequest('/api/v1/users/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async logout(): Promise<void> {
    await httpRequest('/api/v1/users/logout', { method: 'POST' });
  },

  async profile(): Promise<UserProfile> {
    const response = await httpRequest<BaseResponse<UserProfile>>('/api/v1/users/profile');
    return unwrap(response);
  },
};
