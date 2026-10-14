import { AppRouter } from './routers/AppRouter';
import { SellerDemoProvider } from './contexts/SellerDemoContext';
import { useAuth } from './hooks/auth/useAuth';

export default function App() {
  const { profile } = useAuth();
  return <SellerDemoProvider key={profile?.id ?? 'guest'}><AppRouter /></SellerDemoProvider>;
}
