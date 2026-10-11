export function statusClass(status?: string): string {
  if (!status) return '';
  if (['PENDING', 'COOKING', 'DRAFT'].includes(status)) return 'gold';
  if (status === 'CANCELLED') return 'red';
  if (['COMPLETED', 'HIDDEN'].includes(status)) return 'gray';
  return '';
}
