import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { adminClient } from '../../clients/adminClient';
import { Notice } from '../../components/common/Notice';
import { PRODUCT_LABEL } from '../../constants/labels';
import { ROUTES } from '../../constants/routes';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { UiMessage } from '../../types/api';

interface ProductFormState {
  name: string;
  category: string;
  unitPrice: string;
  minGuests: number;
  maxGuests: number;
  dishItems: string;
  description: string;
  imageUrl: string;
  status: string;
}

const initialForm: ProductFormState = {
  name: '',
  category: 'Món miền Nam',
  unitPrice: '',
  minGuests: 3,
  maxGuests: 8,
  dishItems: '',
  description: '',
  imageUrl: '',
  status: 'DRAFT',
};

export function ProductFormPage({ edit = false }: { edit?: boolean }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get('id');
  const [options, setOptions] = useState({ categories: [] as string[], statuses: [] as string[] });
  const [message, setMessage] = useState<UiMessage | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<ProductFormState>(initialForm);

  useEffect(() => {
    const request = edit && id ? adminClient.product(id) : adminClient.productOptions();
    request.then((response: any) => {
      setOptions({ categories: response.categories || [], statuses: response.statuses || [] });
      if (edit && response.product) {
        const product = response.product;
        setForm({
          name: product.name || '', category: product.category || '', unitPrice: String(product.unitPrice ?? ''),
          minGuests: product.minGuests || 3, maxGuests: product.maxGuests || 8,
          dishItems: product.dishItems || '', description: product.description || '', imageUrl: product.imageUrl || '', status: product.status || 'DRAFT',
        });
      }
    }).catch((error: Error) => setMessage({ text: error.message }));
  }, [edit, id]);

  async function save(event: FormEvent) {
    event.preventDefault();

    const unitPrice = Number(form.unitPrice);
    // validate
    if (!form.name.trim()) {
      setMessage({text: 'Tên thực đơn không được để trống.',});
      return;
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      setMessage({text: 'Giá mỗi người không hợp lệ.',});
      return;
    }

    if (form.minGuests < 1 || form.maxGuests < 1) {
      setMessage({text: 'Số khách phải lớn hơn 0.',});
      return;
    }

    if (form.minGuests > form.maxGuests) {
      setMessage({text: 'Số khách tối thiểu không thể lớn hơn số khách tối đa.',});
      return;
    }

    if (form.status === 'PUBLISHED' && !form.imageUrl.trim()) {
      setMessage({text: 'Thực đơn đang hiển thị phải có ảnh đại diện.',});
      return;
    }

    setBusy(true);
    setMessage(null);
    const payload = {
      name: form.name,
      category: form.category,
      unitPrice,
      minGuests: Number(form.minGuests),
      maxGuests: Number(form.maxGuests),
      dishItems: form.dishItems,
      description: form.description,
      imageUrl: form.imageUrl,
      status: form.status,
    } as any;
    try {
      if (edit && id) await adminClient.updateProduct(id, payload);
      else await adminClient.createProduct(payload);
      navigate(ROUTES.ADMIN_PRODUCTS, { replace: true });
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Không thể lưu sản phẩm.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminLayout title={edit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'} lead="Thông tin thực đơn dùng cho khu vực quản trị.">
      <Notice message={message} />
      <form className="card stack" onSubmit={save}>
        <div className="grid grid-2">
          <label className="field">Tên thực đơn<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label className="field">Danh mục<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{options.categories.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="field">Giá mỗi người<input type="number" min="0" value={form.unitPrice} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} required /></label>
          <label className="field">Trạng thái<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{(options.statuses.length ? options.statuses : ['PUBLISHED', 'DRAFT', 'HIDDEN']).map((value) => <option key={value} value={value}>{PRODUCT_LABEL[value] || value}</option>)}</select></label>
          <label className="field">Khách tối thiểu<input type="number" min="1" value={form.minGuests} onChange={(e) => setForm({ ...form, minGuests: Number(e.target.value) })} /></label>
          <label className="field">Khách tối đa<input type="number" min={form.minGuests} value={form.maxGuests} onChange={(event) => setForm({...form, maxGuests: Number(event.target.value),})}/></label>
        </div>
        <label className="field">Danh sách món<textarea value={form.dishItems} onChange={(e) => setForm({ ...form, dishItems: e.target.value })} /></label>
        <label className="field">Mô tả<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <label className="field">URL hình ảnh<input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></label>
        <div className="row"><button className="btn" disabled={busy}>{busy ? 'Đang lưu...' : 'Lưu sản phẩm'}</button><Link className="btn secondary" to={ROUTES.ADMIN_PRODUCTS}>Hủy</Link></div>
      </form>
    </AdminLayout>
  );
}

export function AdminProductNewPage() { return <ProductFormPage />; }
export function AdminProductEditPage() { return <ProductFormPage edit />; }
