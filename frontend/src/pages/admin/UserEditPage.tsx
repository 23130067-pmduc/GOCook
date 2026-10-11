import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { adminClient } from '../../clients/adminClient';
import { Loading } from '../../components/common/Loading';
import { Notice } from '../../components/common/Notice';
import { ROLE_LABEL } from '../../constants/labels';
import { ROUTES } from '../../constants/routes';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { AdminUser } from '../../types/admin';
import type { UiMessage } from '../../types/api';

export function AdminUserEditPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get('id');
  const [data, setData] = useState<{ user: AdminUser; roles: string[] } | null>(null);
  const [form, setForm] = useState<{ username: string; role: string; active: boolean } | null>(null);
  const [message, setMessage] = useState<UiMessage | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminClient.user(id).then((response) => {
      setData(response);
      setForm({ username: response.user.username, role: response.user.role, active: response.user.active });
    }).catch((error: Error) => setMessage({ text: error.message }));
  }, [id]);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!id || !form) return;
    setBusy(true);
    try {
      await adminClient.updateUser(id, form);
      navigate(ROUTES.ADMIN_USERS, { replace: true });
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Không thể cập nhật người dùng.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminLayout title="Chỉnh sửa người dùng" lead="Cập nhật tên hiển thị, vai trò và trạng thái tài khoản.">
      <Notice message={message} />
      {!form || !data ? <Loading /> : (
        <form className="card stack" onSubmit={save}>
          <label className="field">Email<input value={data.user.email} readOnly /></label>
          <label className="field">Tên hiển thị<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label>
          <label className="field">Vai trò<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>{(data.roles || []).map((role) => <option key={role} value={role}>{ROLE_LABEL[role] || role}</option>)}</select></label>
          <label className="check"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /><span>Tài khoản đang hoạt động</span></label>
          <div className="row"><button className="btn" disabled={busy}>{busy ? 'Đang lưu...' : 'Lưu thay đổi'}</button><Link className="btn secondary" to={ROUTES.ADMIN_USERS}>Hủy</Link></div>
        </form>
      )}
    </AdminLayout>
  );
}
