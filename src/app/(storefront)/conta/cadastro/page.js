'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.displayName);
      router.push('/conta');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este e-mail já está cadastrado.');
          break;
        case 'auth/weak-password':
          setError('Senha muito fraca. Use pelo menos 6 caracteres.');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        default:
          setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      router.push('/conta');
    } catch (err) {
      setError('Erro ao fazer cadastro com Google.');
    }
  };

  return (
    <div className="page-enter">
      <div className="auth-page">
        <div className="auth-card" id="register-card">
          <div className="auth-card__header">
            <Link href="/" className="header__logo" style={{ justifyContent: 'center', fontSize: '1.5rem' }}>
              <div className="header__logo-icon">C</div>
              Caramuru
            </Link>
            <h1 className="auth-card__title">Criar sua conta</h1>
            <p className="auth-card__subtitle">
              Cadastre-se e ganhe frete grátis no primeiro pedido!
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            className="btn btn--outline btn--lg btn--full auth-card__google"
            onClick={handleGoogle}
            id="register-google-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>

          <div className="auth-card__divider">
            <span>ou cadastre-se com e-mail</span>
          </div>

          {error && <div className="auth-card__error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-card__form">
            <div>
              <label className="label" htmlFor="register-name">Nome completo</label>
              <input
                type="text"
                id="register-name"
                name="displayName"
                className="input"
                placeholder="Seu nome"
                value={formData.displayName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="register-email">E-mail</label>
              <input
                type="email"
                id="register-email"
                name="email"
                className="input"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label" htmlFor="register-password">Senha</label>
              <input
                type="password"
                id="register-password"
                name="password"
                className="input"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="label" htmlFor="register-password-confirm">Confirmar senha</label>
              <input
                type="password"
                id="register-password-confirm"
                name="passwordConfirm"
                className="input"
                placeholder="Repita a senha"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--lg btn--full"
              disabled={loading}
              id="register-submit-btn"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <p className="auth-card__footer">
            Já tem conta?{' '}
            <Link href="/conta/login" className="auth-card__link">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
