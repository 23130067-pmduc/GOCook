import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { sessionStore } from '../stores/sessionStore';

export type PasswordResetStep = 'request-otp' | 'verify-otp' | 'new-password';

export interface PasswordResetContextValue {
  email: string;
  resetToken: string;
  step: PasswordResetStep;
  setEmail: (email: string) => void;
  startOtpVerification: (email: string) => void;
  acceptResetToken: (email: string, token: string) => void;
  restoreResetToken: (email: string) => string;
  clearResetFlow: () => void;
}

export const PasswordResetContext = createContext<PasswordResetContextValue | undefined>(undefined);

export function PasswordResetProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [step, setStep] = useState<PasswordResetStep>('request-otp');

  const setEmail = useCallback((nextEmail: string) => {
    setEmailState(nextEmail);
  }, []);

  const startOtpVerification = useCallback((nextEmail: string) => {
    setEmailState(nextEmail);
    setResetToken('');
    setStep('verify-otp');
  }, []);

  const acceptResetToken = useCallback((nextEmail: string, token: string) => {
    setEmailState(nextEmail);
    setResetToken(token);
    setStep('new-password');
    sessionStore.setResetToken(nextEmail, token);
  }, []);

  const restoreResetToken = useCallback((nextEmail: string) => {
    const token = sessionStore.getResetToken(nextEmail) || '';
    setEmailState(nextEmail);
    setResetToken(token);
    setStep(token ? 'new-password' : 'verify-otp');
    return token;
  }, []);

  const clearResetFlow = useCallback(() => {
    if (email) sessionStore.clearResetToken(email);
    setEmailState('');
    setResetToken('');
    setStep('request-otp');
  }, [email]);

  const value = useMemo<PasswordResetContextValue>(() => ({
    email,
    resetToken,
    step,
    setEmail,
    startOtpVerification,
    acceptResetToken,
    restoreResetToken,
    clearResetFlow,
  }), [email, resetToken, step, setEmail, startOtpVerification, acceptResetToken, restoreResetToken, clearResetFlow]);

  return <PasswordResetContext.Provider value={value}>{children}</PasswordResetContext.Provider>;
}
