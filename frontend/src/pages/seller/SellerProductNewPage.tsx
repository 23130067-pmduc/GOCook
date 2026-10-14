import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';
import { SellerMenuForm } from './SellerMenuForm';
export function SellerProductNewPage() {
  useDocumentTitle('Thêm thực đơn | GO Cook');
  return <SellerMenuForm />;
}
