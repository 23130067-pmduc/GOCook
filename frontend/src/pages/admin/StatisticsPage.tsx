import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { adminClient } from '../../clients/adminClient';
import { Loading } from '../../components/common/Loading';
import { MetricCard } from '../../components/common/MetricCard';
import { Notice } from '../../components/common/Notice';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { StatisticsResponse } from '../../types/admin';
import type { UiMessage } from '../../types/api';
import { money } from '../../util/format';

function isoDate(date: Date) { return date.toISOString().slice(0, 10); }

export function AdminStatisticsPage() {
  const today = new Date();
  const [from, setFrom] = useState(isoDate(new Date(today.getFullYear(), today.getMonth() - 5, 1)));
  const [to, setTo] = useState(isoDate(today));
  const [data, setData] = useState<StatisticsResponse | null>(null);
  const [message, setMessage] = useState<UiMessage | null>(null);

  const load = useCallback(async () => {
    setMessage(null);
    try {
      setData(await adminClient.statistics(from, to));
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Không thể tải thống kê.' });
    }
  }, [from, to]);

  useEffect(() => { void load(); }, []);

  const chart = useMemo(() => {
    if (!data) return { max: 1, totalStatus: 1, completed: 0, cancelled: 0, active: 0 };
    const max = Math.max(1, ...data.monthlyRevenue.map((item) => Number(item.revenue || 0)));
    const totalStatus = Object.values(data.statusCounts || {}).reduce((sum, value) => sum + Number(value), 0) || 1;
    const completed = Number(data.statusCounts?.COMPLETED || 0);
    const cancelled = Number(data.statusCounts?.CANCELLED || 0);
    return { max, totalStatus, completed, cancelled, active: Math.max(0, totalStatus - cancelled) };
  }, [data]);

  function submit(event: FormEvent) { event.preventDefault(); void load(); }

  return (
    <AdminLayout title="Thống kê nền tảng" lead="Theo dõi doanh thu, đơn đặt nấu và cơ cấu hoạt động của GO Cook.">
      <Notice message={message} />
      <form className="card grid grid-3" onSubmit={submit}>
        <label className="field">Từ ngày<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
        <label className="field">Đến ngày<input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
        <div className="field"><span>&nbsp;</span><button className="btn">Xem thống kê</button></div>
      </form>
      {!data ? <Loading /> : (
        <>
          <div className="grid grid-4"><MetricCard title="Doanh thu hoàn thành" value={money(data.revenue)} /><MetricCard title="Đơn đặt nấu" value={data.orderCount} /><MetricCard title="Đầu bếp hoạt động" value={data.chefCount} /><MetricCard title="Người dùng" value={data.userCount} /></div>
          <div className="grid grid-2">
            <figure className="card stack-sm"><figcaption><h3>Doanh thu theo tháng</h3><p className="small muted">Dữ liệu thật từ đơn hoàn thành</p></figcaption><div className="chart">{data.monthlyRevenue.map((item) => <div className="chart-col" key={item.month}><span>{(Number(item.revenue) / 1_000_000).toFixed(1)}</span><div className="bar" style={{ height: `${Math.max(4, Number(item.revenue) / chart.max * 100)}%` }} /><span>{item.label}</span></div>)}</div></figure>
            <figure className="card"><figcaption><h3>Cơ cấu trạng thái đơn</h3><p className="small muted">Tỷ trọng đơn trong khoảng thời gian đã chọn</p></figcaption><div className="donut" style={{ background: `conic-gradient(var(--green, #2f6b12) 0 ${chart.active / chart.totalStatus * 100}%, #c88b45 ${chart.active / chart.totalStatus * 100}% 100%)` }}><div><strong>{data.orderCount}</strong><small>Đơn đặt nấu</small></div></div><div className="summary-line"><span>Không hủy</span><strong>{Math.round(chart.active / chart.totalStatus * 100)}%</strong></div><div className="summary-line"><span>Đã hủy</span><strong>{Math.round(chart.cancelled / chart.totalStatus * 100)}%</strong></div><div className="summary-line"><span>Hoàn thành</span><strong>{Math.round(chart.completed / chart.totalStatus * 100)}%</strong></div></figure>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
