import type { ReactNode } from 'react';

export function MetricCard({ title, value }: { title: string; value: ReactNode }) {
  return (
    <article className="card metric">
      <p className="small muted">{title}</p>
      <p className="value green">{value}</p>
    </article>
  );
}
