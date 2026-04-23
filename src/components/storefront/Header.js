'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const { itemCount, isHydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/sobre', label: 'Sobre Nós' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <>
      {/* Announcement Bar — Marquee */}
      <div className="announcement-bar">
        <div className="announcement-bar__content">
          <span>🚀 Frete grátis no primeiro pedido! • 📦 Entrega para todo o Brasil • ⚡ Descontos exclusivos por volume</span>
          <span>🚀 Frete grátis no primeiro pedido! • 📦 Entrega para todo o Brasil • ⚡ Descontos exclusivos por volume</span>
        </div>
      </div>

      {/* Header */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="main-header">
        <div className="container header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo">
            <div className="header__logo-icon">C</div>
            <span className="header__logo-text">Caramuru</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="header__nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
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

          {/* Actions */}
          <div className="header__actions">
            {/* Account — desktop only */}
            <Link href="/conta" className="header__icon-btn header__desktop-only" aria-label="Minha conta" id="header-account-btn">
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
          </div>
        </div>

        {/* Mobile Search Bar — Below header row */}
        <div className="header__mobile-search">
          <div className="container">
            <div className="header__mobile-search-wrapper">
              <svg className="header__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                className="header__search-input"
                placeholder="Buscar produtos..."
                aria-label="Buscar produtos"
                id="header-mobile-search"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
