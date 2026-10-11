import {useCallback, useEffect, useState, type FormEvent} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {adminClient} from '../../clients/adminClient';
import {Loading} from '../../components/common/Loading';
import {Notice} from '../../components/common/Notice';
import {Pager} from '../../components/common/Pager';
import {PRODUCT_LABEL} from '../../constants/labels';
import {ROUTES} from '../../constants/routes';
import {AdminLayout} from '../../layouts/AdminLayout';
import type {ProductsResponse} from '../../types/admin';
import type {UiMessage} from '../../types/api';
import {money} from '../../util/format';
import {statusClass} from '../../util/status';

export function AdminProductsPage() {
    const [params, setParams] = useSearchParams();
    const [data, setData] = useState<ProductsResponse | null>(null);
    const [message, setMessage] = useState<UiMessage | null>(null);
    const q = params.get('q') || '';
    const category = params.get('category') || '';
    const status = params.get('status') || '';
    const page = Number(params.get('page') || 0);
    const size = Number(params.get('size') || 10);

    const load = useCallback(async () => {
        try {
            setData(await adminClient.products({q, category, status, page, size}));
        } catch (error) {
            setMessage({text: error instanceof Error ? error.message : 'Không thể tải sản phẩm.'});
        }
    }, [q, category, status, page, size]);

    useEffect(() => {
        void load();
    }, [load]);

    function apply(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setParams({
            q: String(form.get('q') || ''),
            category: String(form.get('category') || ''),
            status: String(form.get('status') || ''),
            size: String(form.get('size') || '10'),
            page: '0'
        });
    }

    async function toggle(id: number, name: string, status: string,) {
        const isPublished = status === 'PUBLISHED';
        const confirmed = window.confirm(isPublished ? `Ẩn sản phẩm "${name}"?` : `Hiển thị sản phẩm "${name}"?`,);

        if (!confirmed) {
            return;
        }

        try {
            await adminClient.toggleProduct(id);

            setMessage({
                type: 'success',
                text: isPublished ? 'Đã ẩn sản phẩm.' : 'Đã hiển thị sản phẩm.',
            });

            await load();
        } catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : 'Không thể cập nhật sản phẩm.',
            });
        }
    }

    return (
        <AdminLayout title="Quản lý sản phẩm" lead="Quản lý thực đơn, giá và trạng thái hiển thị.">
            <Notice message={message}/>
            <div className="between"><span/><Link className="btn" to={ROUTES.ADMIN_PRODUCT_NEW}>+ Thêm thực đơn</Link>
            </div>
            <form className="card grid grid-4" onSubmit={apply}>
                <label className="field">Tìm sản phẩm<input name="q" defaultValue={q}/></label>
                <label className="field">Danh mục<select name="category" defaultValue={category}>
                    <option value="">Tất cả</option>
                    {(data?.categories || []).map((value) => <option key={value}>{value}</option>)}</select></label>
                <label className="field">Trạng thái<select name="status" defaultValue={status}>
                    <option value="">Tất cả</option>
                    {['PUBLISHED', 'DRAFT', 'HIDDEN'].map((value) => <option key={value}
                                                                             value={value}>{PRODUCT_LABEL[value]}</option>)}
                </select></label>
                <label className="field">Số dòng<select name="size" defaultValue={size}>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select></label>
                <button className="btn">Lọc sản phẩm</button>
            </form>
            {!data ? <Loading/> : (
                <section className="card stack">
                    <div className="table-wrap">
                        <table>
                            <caption>Hiển thị {data.numberOfElements} / {data.totalElements} sản phẩm</caption>
                            <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Tên</th>
                                <th>Danh mục</th>
                                <th>Giá/người</th>
                                <th>Số khách</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody>{data.content.map((product) => <tr key={product.id}>
                                <td>{product.displayCode || `SP-${product.id}`}</td>
                                <td><strong>{product.name}</strong></td>
                                <td>{product.category}</td>
                                <td>{money(product.unitPrice)}</td>
                                <td>{product.minGuests}–{product.maxGuests}</td>
                                <td><span
                                    className={`badge ${statusClass(product.status)}`}>{PRODUCT_LABEL[product.status] || product.status}</span>
                                </td>
                                <td>
                                    <div className="row"><Link className="text-link"
                                                               to={`${ROUTES.ADMIN_PRODUCT_EDIT}?id=${product.id}`}>Sửa</Link>
                                        <button className="text-link" type="button"
                                                onClick={() => void toggle( product.id, product.name, product.status,)}>{product.status === 'PUBLISHED' ? 'Ẩn' : 'Hiện'}</button>
                                    </div>
                                </td>
                            </tr>)}</tbody>
                        </table>
                    </div>
                    <Pager data={data} onPage={(nextPage) => setParams({
                        q,
                        category,
                        status,
                        size: String(size),
                        page: String(nextPage)
                    })}/>
                </section>
            )}
        </AdminLayout>
    );
}
