'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/constants/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getItemPrice, subtotal, itemCount, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="container cart-page">
        <h1 className="cart-page__title">Carrinho</h1>
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <div className="skeleton" style={{ width: '100%', height: 120, marginBottom: 16 }} />
          <div className="skeleton" style={{ width: '100%', height: 120 }} />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container cart-page">
        <h1 className="cart-page__title">Carrinho</h1>
        <div className="cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <h2 className="cart-empty__title">Seu carrinho está vazio</h2>
          <p className="cart-empty__text">
            Explore nossos produtos e encontre as embalagens perfeitas para seu negócio.
          </p>
          <Link href="/produtos" className="btn btn--primary btn--lg">
            Explorar Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="pdp__breadcrumb">
            <Link href="/">Início</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>Carrinho</span>
          </div>
        </div>
      </div>

      <div className="container cart-page">
        <h1 className="cart-page__title">
          Carrinho
          <span style={{ fontSize: 'var(--text-lg)', color: 'var(--neutral-400)', fontWeight: 400, marginLeft: '0.5rem' }}>
            ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
          </span>
        </h1>

        <div className="cart-page__grid">
          {/* Cart Items */}
          <div>
            {items.map((item) => {
              const price = getItemPrice(item);
              const lineTotal = price * item.quantity;

              return (
                <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                  {/* Image */}
                  <div className="cart-item__image">
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'var(--neutral-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                    }}>
                      🛍️
                    </div>
                  </div>

                  {/* Info */}
                  <div className="cart-item__info">
                    <Link href={`/produtos/${item.slug}`} className="cart-item__name">
                      {item.name}
                    </Link>
                    <span className="cart-item__variant">
                      {formatPrice(price)} / {item.unit}
                    </span>
                    {/* Quantity control */}
                    <div className="pdp__quantity-control" style={{ marginTop: '0.5rem', width: 'fit-content' }}>
                      <button
                        className="pdp__quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{ width: 32, height: 32, fontSize: 'var(--text-sm)' }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="pdp__quantity-input"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        style={{ width: 50, height: 32, fontSize: 'var(--text-sm)' }}
                      />
                      <button
                        className="pdp__quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: 32, height: 32, fontSize: 'var(--text-sm)' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="cart-item__price">
                    {formatPrice(lineTotal)}
                  </div>

                  {/* Remove */}
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="cart-summary" id="cart-summary">
            <h2 className="cart-summary__title">Resumo do Pedido</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Frete</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>A calcular</span>
            </div>

            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="cart-summary__checkout">
              <Link href="/checkout" className="btn btn--primary btn--lg btn--full" id="checkout-btn">
                Finalizar Compra
              </Link>
            </div>

            <div className="cart-summary__secure">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Compra 100% segura
            </div>

            <Link
              href="/produtos"
              className="btn btn--ghost btn--full"
              style={{ marginTop: '0.5rem' }}
            >
              ← Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
