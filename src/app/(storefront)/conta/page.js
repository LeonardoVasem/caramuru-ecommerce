'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function AccountPage() {
  const router = useRouter();
  const { user, customerData, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/conta/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="skeleton" style={{ width: 200, height: 200, borderRadius: '50%', margin: '0 auto 2rem' }} />
        <div className="skeleton" style={{ width: 300, height: 24, margin: '0 auto 1rem' }} />
        <div className="skeleton" style={{ width: 200, height: 18, margin: '0 auto' }} />
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="page-enter">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="pdp__breadcrumb">
            <Link href="/">Início</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>Minha Conta</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '960px', padding: '2rem 1rem 4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: '2rem' }}>
          Minha Conta
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Profile Card */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-2xl)',
            padding: '2rem',
            border: '1px solid var(--neutral-150)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--primary-100)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
              }}>
                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                  {user.displayName || 'Usuário'}
                </div>
                <div style={{ color: 'var(--neutral-500)', fontSize: 'var(--text-sm)' }}>
                  {user.email}
                </div>
              </div>
            </div>

            {customerData?.isFirstPurchase && (
              <div style={{
                background: 'var(--success-light)',
                border: '1px solid var(--success)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: 'var(--text-sm)',
                color: 'var(--success)',
                fontWeight: 600,
              }}>
                🎉 Você tem frete grátis no primeiro pedido!
              </div>
            )}

            <button onClick={handleSignOut} className="btn btn--outline btn--sm btn--full" id="signout-btn">
              Sair da conta
            </button>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: '📦', label: 'Meus Pedidos', desc: 'Acompanhe e gerencie seus pedidos', href: '/conta/pedidos' },
              { icon: '📍', label: 'Endereços', desc: 'Gerencie seus endereços de entrega', href: '/conta/enderecos' },
              { icon: '👤', label: 'Dados Pessoais', desc: 'Atualize suas informações', href: '/conta/dados' },
              { icon: '🔒', label: 'Segurança', desc: 'Altere sua senha', href: '/conta/seguranca' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '1.25rem',
                border: '1px solid var(--neutral-150)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.label}</div>
                  <div style={{ color: 'var(--neutral-500)', fontSize: 'var(--text-sm)' }}>{item.desc}</div>
                </div>
                <svg style={{ marginLeft: 'auto', color: 'var(--neutral-400)' }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin link */}
        {customerData?.role === 'admin' && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--neutral-900)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                ⚡ Painel Administrativo
              </div>
              <div style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)' }}>
                Gerencie produtos, pedidos e clientes
              </div>
            </div>
            <Link href="/admin" className="btn btn--primary">
              Acessar Admin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
