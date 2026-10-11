import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authClient } from '../../clients/authClient';
import { AuthShell } from '../../components/auth/AuthShell';
import { Notice } from '../../components/common/Notice';
import { ROUTES } from '../../constants/routes';
import type { UiMessage } from '../../types/api';
import { authErrorMessage } from '../../util/authError';
import { normalizeEmail, normalizeOtp } from '../../validations/authValidation';

export function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(params.get('email') || '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState<UiMessage | null>(null);
  const [busy, setBusy] = useState(false);

  async function verify(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await authClient.verifyEmail({ email: normalizeEmail(email), otp });
      setMessage({ type: 'success', text: 'Xác nhận email thành công.' });
      window.setTimeout(() => navigate(`${ROUTES.LOGIN}?verified=1`), 400);
    } catch (error) {
      setMessage({ text: authErrorMessage(error, 'Không thể xác nhận email.') });
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true);
    setMessage(null);
    try {
      const cleanEmail = normalizeEmail(email);
      await authClient.resendVerification(cleanEmail);
      setMessage({ type: 'success', text: `OTP mới đã được gửi tới ${cleanEmail}.` });
    } catch (error) {
      setMessage({ text: authErrorMessage(error, 'Không thể gửi lại OTP.') });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Xác nhận email">
      <div><span className="badge">Xác nhận email</span><h1>Nhập mã xác nhận</h1><p className="muted">Mã OTP 6 chữ số có hiệu lực trong 10 phút.</p></div>
      <Notice message={message} />
      <form className="stack" onSubmit={verify}>
        <label className="field">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label className="field">Mã OTP<input value={otp} onChange={(e) => setOtp(normalizeOtp(e.target.value))} inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required /></label>
        <button className="btn" disabled={busy}>{busy ? 'Đang xử lý...' : 'Xác nhận email'}</button>
      </form>
      <button className="text-link" type="button" onClick={() => void resend()} disabled={busy}>Gửi lại mã xác nhận</button>
      <Link className="text-link" to={ROUTES.LOGIN}>Về đăng nhập</Link>
    </AuthShell>
  );
}
