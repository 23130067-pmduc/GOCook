import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { adminClient } from '../../clients/adminClient';
import { Loading } from '../../components/common/Loading';
import { Notice } from '../../components/common/Notice';
import { Pager } from '../../components/common/Pager';
import { ROLE_LABEL } from '../../constants/labels';
import { ROUTES } from '../../constants/routes';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { UsersResponse } from '../../types/admin';
import type { UiMessage } from '../../types/api';

export function AdminUsersPage() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState<UsersResponse | null>(null);
  const [message, setMessage] = useState<UiMessage | null>(null);
  const q = params.get('q') || '';
  const role = params.get('role') || '';
  const status = params.get('status') || '';
  const page = Number(params.get('page') || 0);
  const size = Number(params.get('size') || 10);

  const load = useCallback(async () => {
    try {
      setData(await adminClient.users({ q, role, status, page, size }));
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Không thể tải người dùng.' });
    }
  }, [q, role, status, page, size]);

  useEffect(() => { void load(); }, [load]);

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setParams({ q: String(form.get('q') || ''), role: String(form.get('role') || ''), status: String(form.get('status') || ''), size: String(form.get('size') || '10'), page: '0' });
  }

  async function toggle(id: number) {
    try {
      await adminClient.toggleUser(id);
      setMessage({ type: 'success', text: 'Đã cập nhật trạng thái tài khoản.' });
      await load();
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Không thể cập nhật tài khoản.' });
    }
  }

  return (
    <AdminLayout title="Quản lý người dùng" lead="Tìm kiếm, phân quyền và khóa/mở tài khoản.">
      <Notice message={message} />
      <form className="card grid grid-4" onSubmit={apply}>
        <label className="field">Tìm người dùng<input name="q" defaultValue={q} placeholder="Tên hoặc email" /></label>
        <label className="field">Vai trò<select name="role" defaultValue={role}><option value="">Tất cả</option>{['USER', 'INSTRUCTOR', 'ADMIN', 'COMPANY_ADMIN'].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="field">Trạng thái<select name="status" defaultValue={status}><option value="">Tất cả</option><option value="active">Đang hoạt động</option><option value="inactive">Đã khóa</option></select></label>
        <label className="field">Số dòng<select name="size" defaultValue={size}><option>10</option><option>20</option><option>50</option></select></label>
        <button className="btn" type="submit">Lọc người dùng</button>
      </form>
      {!data ? <Loading /> : (
        <section className="card stack">
          <div className="table-wrap"><table><caption>Hiển thị {data.numberOfElements} / {data.totalElements} người dùng</caption><thead><tr><th>Người dùng</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th><th>Ngày tạo</th><th>Thao tác</th></tr></thead><tbody>{data.content.map((user) => <tr key={user.id}><td><strong>{user.username}</strong></td><td>{user.email}</td><td>{user.roleLabel || ROLE_LABEL[user.role]}</td><td><span className={`badge ${user.active ? '' : 'red'}`}>{user.active ? 'Hoạt động' : 'Đã khóa'}</span></td><td>{user.createdAtDisplay || '—'}</td><td><div className="row"><Link className="text-link" to={`${ROUTES.ADMIN_USER_EDIT}?id=${user.id}`}>Sửa</Link><button className="text-link" type="button" onClick={() => void toggle(user.id)}>{user.active ? 'Khóa' : 'Mở'}</button></div></td></tr>)}</tbody></table></div>
          <Pager data={data} onPage={(nextPage) => setParams({ q, role, status, size: String(size), page: String(nextPage) })} />
        </section>
      )}
    </AdminLayout>
  );
}
