'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('E-mail não encontrado.');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        default:
          setError('Erro ao enviar e-mail. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      <div className="auth-page">
        <div className="auth-card" id="reset-password-card">
          <div className="auth-card__header">
            <Link href="/" className="header__logo" style={{ justifyContent: 'center', fontSize: '1.5rem' }}>
              <div className="header__logo-icon">C</div>
              Caramuru
            </Link>
            <h1 className="auth-card__title">Recuperar senha</h1>
            <p className="auth-card__subtitle">
              {sent
                ? 'Verifique sua caixa de entrada e siga as instruções.'
                : 'Informe seu e-mail para receber o link de redefinição.'}
            </p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
              <p style={{ color: 'var(--success)', fontWeight: 600, marginBottom: '1.5rem' }}>
                E-mail enviado com sucesso!
              </p>
              <p style={{ color: 'var(--neutral-500)', fontSize: 'var(--text-sm)', marginBottom: '2rem' }}>
                Se o e-mail <strong>{email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha.
              </p>
              <Link href="/conta/login" className="btn btn--primary">
                Voltar ao Login
              </Link>
            </div>
          ) : (
            <>
              {error && <div className="auth-card__error">{error}</div>}
              <form onSubmit={handleSubmit} className="auth-card__form">
                <div>
                  <label className="label" htmlFor="reset-email">E-mail</label>
                  <input
                    type="email"
                    id="reset-email"
                    className="input"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg btn--full"
                  disabled={loading}
                  id="reset-submit-btn"
                >
                  {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                </button>
              </form>
              <p className="auth-card__footer">
                Lembrou a senha?{' '}
                <Link href="/conta/login" className="auth-card__link">
                  Fazer login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
