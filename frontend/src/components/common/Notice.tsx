import type { UiMessage } from '../../types/api';

export function Notice({ message }: { message: UiMessage | null }) {
  if (!message) return null;
  return <div className={`auth-message ${message.type ?? 'error'}`}>{message.text}</div>;
}
