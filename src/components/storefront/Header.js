'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const { itemCount, isHydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/sobre', label: 'Sobre Nós' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span className="announcement-bar__text">
          🚚 Frete grátis no primeiro pedido! • 📦 Entrega para todo o Brasil • ⚡ Descontos exclusivos por volume
        </span>
      </div>

      {/* Header */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo">
            <div className="header__logo-icon">C</div>
            Caramuru
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="header__nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {/* Search */}
            <div className="header__search">
              <svg className="header__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                className="header__search-input"
                placeholder="Buscar produtos..."
                aria-label="Buscar produtos"
                id="header-search"
              />
            </div>

            {/* Account */}
            <Link href="/conta" className="header__icon-btn" aria-label="Minha conta" id="header-account-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/carrinho" className="header__icon-btn" aria-label="Carrinho de compras" id="header-cart-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {isHydrated && itemCount > 0 && (
                <span className="header__cart-count">{itemCount}</span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="header__menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
              id="mobile-menu-toggle"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}>
        <div className="mobile-nav__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-nav__panel">
          <div className="mobile-nav__header">
            <span className="header__logo" style={{ fontSize: '1.25rem' }}>
              <div className="header__logo-icon" style={{ width: 32, height: 32, fontSize: '0.875rem' }}>C</div>
              Caramuru
            </span>
            <button className="mobile-nav__close" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mobile-nav__links" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav__link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/carrinho" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>
              🛒 Carrinho {isHydrated && itemCount > 0 && `(${itemCount})`}
            </Link>
            <Link href="/conta" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>
              👤 Minha Conta
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
