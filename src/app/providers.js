'use client';

import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
