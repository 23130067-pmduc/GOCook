export function Loading({ text = 'Đang tải dữ liệu...' }: { text?: string }) {
  return <div className="card">{text}</div>;
}
