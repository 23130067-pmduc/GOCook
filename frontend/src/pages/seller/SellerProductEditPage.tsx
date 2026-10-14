import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';
import { SellerMenuForm } from './SellerMenuForm';
export function SellerProductEditPage() {
  useDocumentTitle('Chỉnh sửa thực đơn | GO Cook');
  const [params] = useSearchParams();
  return <SellerMenuForm key={params.get('id')} editing />;
}
