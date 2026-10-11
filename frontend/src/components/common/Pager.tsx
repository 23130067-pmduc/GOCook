import type { PageResponse } from '../../types/api';

export function Pager<T>({ data, onPage }: { data: PageResponse<T>; onPage: (page: number) => void }) {
  if (data.totalPages <= 1) return null;
  return (
    <div className="between">
      <span className="small muted">Trang {data.number + 1} / {data.totalPages}</span>
      <div className="row">
        <button className="btn secondary sm" disabled={data.first} onClick={() => onPage(data.number - 1)}>← Trước</button>
        <button className="btn secondary sm" disabled={data.last} onClick={() => onPage(data.number + 1)}>Sau →</button>
      </div>
    </div>
  );
}
