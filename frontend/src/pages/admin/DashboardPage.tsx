import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminClient } from '../../clients/adminClient';
import { Loading } from '../../components/common/Loading';
import { MetricCard } from '../../components/common/MetricCard';
import { Notice } from '../../components/common/Notice';
import { ORDER_LABEL } from '../../constants/labels';
import { ROUTES } from '../../constants/routes';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { DashboardResponse } from '../../types/admin';
import type { UiMessage } from '../../types/api';
import { dateTime, money } from '../../util/format';
import { statusClass } from '../../util/status';

export function AdminDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [message, setMessage] = useState<UiMessage | null>(null);

  useEffect(() => {
    adminClient.dashboard().then(setData).catch((error: Error) => setMessage({ text: error.message }));
  }, []);

  return (
    <AdminLayout title="Tổng quan" lead="Theo dõi nhanh hoạt động của GO Cook từ dữ liệu thật trong hệ thống.">
      <Notice message={message} />
      {!data ? <Loading /> : (
        <>
          <div className="grid grid-4">
            <MetricCard title="Người dùng" value={data.userCount} />
            <MetricCard title="Sản phẩm đang hiển thị" value={data.productCount} />
            <MetricCard title="Đơn hàng" value={data.orderCount} />
            <MetricCard title="Doanh thu hoàn thành" value={money(data.completedRevenue)} />
          </div>
          <section className="card stack">
            <div className="between"><h3>Đơn hàng gần đây</h3><Link className="text-link" to={ROUTES.ADMIN_ORDERS}>Xem tất cả</Link></div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Thực đơn</th><th>Ngày nấu</th><th>Trạng thái</th></tr></thead>
                <tbody>{(data.recentOrders ?? []).map((order) => (
                  <tr key={order.id}>
                    <td><Link className="text-link" to={`${ROUTES.ADMIN_ORDER_DETAIL}?id=${order.id}`}>{order.orderCode}</Link></td>
                    <td>{order.customerName}</td><td>{order.productName}</td>
                    <td>{order.scheduledAtDisplay || dateTime(order.scheduledAt)}</td>
                    <td><span className={`badge ${statusClass(order.status)}`}>{ORDER_LABEL[order.status] || order.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}
