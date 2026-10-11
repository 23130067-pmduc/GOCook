import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { adminClient } from '../../clients/adminClient';
import { Loading } from '../../components/common/Loading';
import { Notice } from '../../components/common/Notice';
import { Pager } from '../../components/common/Pager';
import { ORDER_LABEL } from '../../constants/labels';
import { ROUTES } from '../../constants/routes';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { OrdersResponse } from '../../types/admin';
import type { UiMessage } from '../../types/api';
import { dateTime, money } from '../../util/format';
import { statusClass } from '../../util/status';

export function AdminOrdersPage() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [message, setMessage] = useState<UiMessage | null>(null);

  const q = params.get('q') || '';
  const status = params.get('status') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const page = Number(params.get('page') || 0);
  const size = Number(params.get('size') || 10);
  const queryKey = useMemo(() => JSON.stringify({ q, status, from, to, page, size }), [q, status, from, to, page, size]);

  useEffect(() => {
    adminClient.orders({ q, status, from: from || undefined, to: to || undefined, page, size })
      .then(setData)
      .catch((error: Error) => setMessage({ text: error.message }));
  }, [queryKey]);

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setParams({ q: String(form.get('q') || ''), status: String(form.get('status') || ''), from: String(form.get('from') || ''), to: String(form.get('to') || ''), size: String(form.get('size') || '10'), page: '0' });
  }

  return (
    <AdminLayout title="Quản lý đơn hàng" lead="Tìm kiếm, lọc theo thời gian và cập nhật tiến trình các đơn đặt nấu.">
      <Notice message={message} />
      <form className="card grid grid-3" onSubmit={apply}>
        <label className="field">Tìm đơn<input name="q" defaultValue={q} placeholder="Mã đơn, khách, thực đơn hoặc đầu bếp" /></label>
        <label className="field">Trạng thái<select name="status" defaultValue={status}><option value="">Tất cả</option>{Object.keys(ORDER_LABEL).map((value) => <option key={value} value={value}>{ORDER_LABEL[value]}</option>)}</select></label>
        <label className="field">Từ ngày<input type="date" name="from" defaultValue={from} /></label>
        <label className="field">Đến ngày<input type="date" name="to" defaultValue={to} /></label>
        <label className="field">Số dòng<select name="size" defaultValue={size}><option>10</option><option>20</option><option>50</option></select></label>
        <button className="btn">Lọc đơn hàng</button>
      </form>
      {!data ? <Loading /> : (
        <section className="card stack">
          <div className="table-wrap"><table><caption>Hiển thị {data.numberOfElements} / {data.totalElements} đơn hàng</caption><thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Thực đơn</th><th>Ngày nấu</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{data.content.map((order) => <tr key={order.id}><td><strong>{order.orderCode}</strong></td><td>{order.customerName}</td><td>{order.productName}</td><td>{order.scheduledAtDisplay || dateTime(order.scheduledAt)}</td><td>{money(order.totalAmount)}</td><td><span className={`badge ${statusClass(order.status)}`}>{ORDER_LABEL[order.status] || order.status}</span></td><td><Link className="text-link" to={`${ROUTES.ADMIN_ORDER_DETAIL}?id=${order.id}`}>Chi tiết</Link></td></tr>)}</tbody></table></div>
          <Pager data={data} onPage={(nextPage) => setParams({ q, status, from, to, size: String(size), page: String(nextPage) })} />
        </section>
      )}
    </AdminLayout>
  );
}
