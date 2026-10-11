import { useContext } from 'react';
import { PasswordResetContext } from '../../contexts/PasswordResetContext';

export function usePasswordReset() {
  const context = useContext(PasswordResetContext);
  if (!context) {
    throw new Error('usePasswordReset must be used inside PasswordResetProvider.');
  }
  return context;
}
