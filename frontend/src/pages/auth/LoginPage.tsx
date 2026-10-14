import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthShell } from "../../components/auth/AuthShell";
import { Notice } from "../../components/common/Notice";
import { ApiError } from "../../clients/httpClient";
import { loginDestination } from "../../util/loginDestination";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/auth/useAuth";
import type { UiMessage } from "../../types/api";
import { authErrorMessage } from "../../util/authError";
import { normalizeEmail } from "../../validations/authValidation";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<UiMessage | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const email = normalizeEmail(form.email);
      const profile = await login(email, form.password);
      if (!profile)
        throw new Error("Không thể tải tài khoản. Vui lòng đăng nhập lại.");
      const target = loginDestination(
        profile.roles ?? [],
        (location.state as { from?: string } | null)?.from,
      );
      setMessage({ type: "success", text: "Đăng nhập thành công." });
      window.setTimeout(() => navigate(target, { replace: true }), 200);
    } catch (error) {
      setMessage({ text: authErrorMessage(error, "Không thể đăng nhập.") });
      if (error instanceof ApiError && error.code === "1013") {
        window.setTimeout(
          () =>
            navigate(
              `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(normalizeEmail(form.email))}`,
            ),
          600,
        );
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Đăng nhập">
      <nav className="tabs">
        <Link aria-current="page" to={ROUTES.LOGIN}>
          Đăng nhập
        </Link>
        <Link to={ROUTES.REGISTER}>Đăng ký</Link>
      </nav>
      <div>
        <h1>Chào bạn trở lại!</h1>
        <p className="muted">Bữa cơm ngon tiếp theo đang chờ bạn.</p>
      </div>
      <Notice message={message} />
      <form className="stack" onSubmit={submit}>
        <label className="field">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ban@example.com"
            autoComplete="username"
            required
          />
        </label>
        <label className="field">
          Mật khẩu
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            required
          />
        </label>
        <div className="between">
          <span />
          <Link className="text-link small" to={ROUTES.FORGOT_PASSWORD}>
            Quên mật khẩu?
          </Link>
        </div>
        <button className="btn full" disabled={busy}>
          {busy ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
      <p className="small muted">
        Bạn mới đến?{" "}
        <Link className="text-link" to={ROUTES.REGISTER}>
          Tạo tài khoản
        </Link>
      </p>
    </AuthShell>
  );
}
