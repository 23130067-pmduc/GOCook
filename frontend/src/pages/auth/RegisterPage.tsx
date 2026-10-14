import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../../clients/authClient';
import { AuthShell } from '../../components/auth/AuthShell';
import { Notice } from '../../components/common/Notice';
import { ROUTES } from '../../constants/routes';
import type { UiMessage } from '../../types/api';
import { authErrorMessage } from '../../util/authError';
import { normalizeEmail, validatePasswordPair } from '../../validations/authValidation';

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [terms, setTerms] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<UiMessage | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const passwordError = validatePasswordPair(form.password, form.confirm);
    if (passwordError) return setMessage({ text: passwordError });
    if (!terms) return setMessage({ text: 'Bạn cần đồng ý với điều khoản sử dụng.' });

    setBusy(true);
    try {
      const email = normalizeEmail(form.email);
      await authClient.register({ username: form.username.trim(), email, password: form.password });
      setMessage({ type: 'success', text: 'Đăng ký thành công. Bạn có thể đăng nhập ngay; chỉ cần xác thực email khi đặt dịch vụ.' });
      window.setTimeout(() => navigate(`${ROUTES.LOGIN}?registered=1&email=${encodeURIComponent(email)}`), 500);
    } catch (error) {
      setMessage({ text: authErrorMessage(error, 'Không thể tạo tài khoản.') });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Đăng ký">
      <nav className="tabs"><Link to={ROUTES.LOGIN}>Đăng nhập</Link><Link aria-current="page" to={ROUTES.REGISTER}>Đăng ký</Link></nav>
      <div><h1>Tạo tài khoản</h1><p className="muted">Đăng ký để đặt đầu bếp và quản lý bữa ăn.</p></div>
      <Notice message={message} />
      <form className="stack" onSubmit={submit}>
        <label className="field">Họ và tên<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label>
        <label className="field">Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label className="field">Mật khẩu<input type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <label className="field">Nhập lại mật khẩu<input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required /></label>
        <label className="check"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /><span>Tôi đồng ý với điều khoản sử dụng.</span></label>
        <button className="btn full" disabled={busy}>{busy ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}</button>
      </form>
    </AuthShell>
  );
}
