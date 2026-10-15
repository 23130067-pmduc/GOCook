import {useCallback, useEffect, useState, type FormEvent, type ReactNode} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {adminClient} from '../../clients/adminClient';
import {Loading} from '../../components/common/Loading';
import {Notice} from '../../components/common/Notice';
import {ORDER_LABEL} from '../../constants/labels';
import {ROUTES} from '../../constants/routes';
import {AdminLayout} from '../../layouts/AdminLayout';
import type {AdminOrder} from '../../types/admin';
import type {UiMessage} from '../../types/api';
import {dateTime, money} from '../../util/format';

export function AdminOrderDetailPage() {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [data, setData] = useState<{ order: AdminOrder; allowedStatuses: string[] } | null>(null);
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');
    const [message, setMessage] = useState<UiMessage | null>(null);
    const [busy, setBusy] = useState(false);

    const load = useCallback(async () => {
        if (!id) return;
        try {
            const response = await adminClient.order(id);
            setData(response);
            setStatus(response.order.status);
            setNote(response.order.internalNote || '');
        } catch (error) {
            setMessage({text: error instanceof Error ? error.message : 'Không thể tải đơn hàng.'});
        }
    }, [id]);

    useEffect(() => {
        void load();
    }, [load]);

    async function save(event: FormEvent) {
        event.preventDefault();
        if (!id) return;

        const currentStatus = data?.order.status;

        const criticalChange = currentStatus !== status && ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(status);

        if (criticalChange) {
            const confirmed = window.confirm(`Xác nhận chuyển đơn từ "${ORDER_LABEL[currentStatus || ''] || currentStatus
                }" sang "${ORDER_LABEL[status] || status
                }"?`,
            );

            if (!confirmed) {
                return;
            }
        }

        setBusy(true);
        try {
            const response = await adminClient.updateOrder(id, {status, internalNote: note});
            setData(response);
            setStatus(response.order.status);
            setMessage({type: 'success', text: response.message || 'Đã cập nhật đơn hàng.'});
        } catch (error) {
            setMessage({text: error instanceof Error ? error.message : 'Không thể cập nhật đơn hàng.'});
        } finally {
            setBusy(false);
        }
    }

    if (!data) return <AdminLayout title="Chi tiết đơn hàng"><Notice message={message}/><Loading/></AdminLayout>;
    const order = data.order;

    return (
        <AdminLayout title={`Đơn hàng ${order.orderCode}`} lead="Chi tiết và cập nhật tiến trình đơn đặt nấu.">
            <Notice message={message}/>
            <section className="card stack">
                <div className="grid grid-2">
                    <Info label="Khách hàng" value={order.customerName}/><Info label="Email"
                                                                               value={order.customerEmail || '—'}/>
                    <Info label="Thực đơn" value={order.productName}/><Info label="Đầu bếp"
                                                                            value={order.chefName || '—'}/>
                    <Info label="Ngày nấu" value={order.scheduledAtDisplay || dateTime(order.scheduledAt)}/><Info
                    label="Số khách" value={order.guestCount}/>
                    <Info label="Tổng tiền" value={money(order.totalAmount)}/><Info label="Địa chỉ"
                                                                                    value={order.serviceAddress || '—'}/>
                </div>
                {order.customerNote &&
                    <div><p className="small muted">Ghi chú khách hàng</p><p>{order.customerNote}</p></div>}
            </section>
            <form className="card stack" onSubmit={save}>
                <label className="field">Trạng thái<select value={status}
                                                           onChange={(e) => setStatus(e.target.value)}>{(data.allowedStatuses || []).map((value) =>
                    <option key={value} value={value}>{ORDER_LABEL[value] || value}</option>)}</select></label>
                <label className="field">Ghi chú nội bộ<textarea value={note}
                                                                 onChange={(e) => setNote(e.target.value)}/></label>
                <div className="row">
                    <button className="btn" disabled={busy}>{busy ? 'Đang lưu...' : 'Cập nhật đơn hàng'}</button>
                    <Link className="btn secondary" to={ROUTES.ADMIN_ORDERS}>Quay lại</Link></div>
            </form>
        </AdminLayout>
    );
}

function Info({label, value}: { label: string; value: ReactNode }) {
    return <div><p className="small muted">{label}</p><strong>{value}</strong></div>;
}
