'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/produtos', label: 'Produtos', icon: '📦' },
  { href: '/admin/pedidos', label: 'Pedidos', icon: '🛒' },
  { href: '/admin/clientes', label: 'Clientes', icon: '👥' },
  { href: '/admin/cupons', label: 'Cupons', icon: '🏷️' },
];

export default function AdminLayout({ children }) {
  const { user, customerData, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/conta/login');
      } else if (customerData && customerData.role !== 'admin') {
        router.push('/conta');
      }
    }
  }, [user, customerData, loading, router]);

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="admin-layout__sidebar">
          <div className="skeleton" style={{ width: '100%', height: 40, marginBottom: 24 }} />
          <div className="skeleton" style={{ width: '100%', height: 32, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: '100%', height: 32, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: '100%', height: 32, marginBottom: 8 }} />
        </div>
        <main className="admin-layout__main">
          <div className="skeleton" style={{ width: '100%', height: 200 }} />
        </main>
      </div>
    );
  }

  if (!user || (customerData && customerData.role !== 'admin')) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-layout__sidebar" id="admin-sidebar">
        <div className="admin-layout__sidebar-header">
          <Link href="/" className="header__logo" style={{ fontSize: '1.125rem', gap: '0.5rem' }}>
            <div className="header__logo-icon" style={{ width: 32, height: 32, fontSize: '0.75rem' }}>C</div>
            Caramuru
          </Link>
          <span className="badge badge--primary" style={{ fontSize: '0.625rem' }}>ADMIN</span>
        </div>

        <nav className="admin-layout__nav">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-layout__nav-link ${isActive ? 'admin-layout__nav-link--active' : ''}`}
                id={`admin-nav-${item.label.toLowerCase()}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-layout__sidebar-footer">
          <Link href="/" className="admin-layout__nav-link" style={{ color: 'var(--neutral-500)' }}>
            ← Voltar à loja
          </Link>
          <button onClick={handleSignOut} className="admin-layout__nav-link" style={{ color: 'var(--error)', border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            🚪 Sair
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="admin-layout__main">
        {/* Top bar */}
        <header className="admin-layout__topbar">
          <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', textTransform: 'capitalize' }}>
            {ADMIN_NAV.find((n) => n.href === pathname)?.label || 'Admin'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--primary-100)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              {user.displayName?.[0]?.toUpperCase() || 'A'}
            </div>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
              {user.displayName || 'Admin'}
            </span>
          </div>
        </header>

        <div className="admin-layout__content">
          {children}
        </div>
      </main>
    </div>
  );
}
