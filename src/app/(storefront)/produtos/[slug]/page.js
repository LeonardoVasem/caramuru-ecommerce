'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { getProductBySlug, formatPrice, PRODUCTS } from '@/constants/products';
import ProductCard from '@/components/storefront/ProductCard';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(product?.pricing?.bulkPrices?.[0]?.minQty || 1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Produto não encontrado</h1>
        <p style={{ color: 'var(--neutral-500)', marginBottom: '2rem' }}>
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Link href="/produtos" className="btn btn--primary">
          Ver Todos os Produtos
        </Link>
      </div>
    );
  }

  // Calculate current price based on quantity
  const getCurrentPrice = () => {
    if (!product.pricing.bulkPrices) return product.pricing.unitPrice;
    const sorted = [...product.pricing.bulkPrices].sort((a, b) => b.minQty - a.minQty);
    const applicable = sorted.find((bp) => quantity >= bp.minQty);
    return applicable ? applicable.price : product.pricing.unitPrice;
  };

  const currentPrice = getCurrentPrice();
  const totalPrice = currentPrice * quantity;

  // Related products
  const relatedProducts = PRODUCTS
    .filter((p) => p.parentCategoryId === product.parentCategoryId && p.id !== product.id && p.status === 'active')
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const specs = product.specifications || {};

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="pdp__breadcrumb">
            <Link href="/">Início</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <Link href="/produtos">Produtos</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <Link href={`/produtos?categoria=${product.parentCategoryId}`}>
              {product.parentCategoryId?.replace(/-/g, ' ')}
            </Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container pdp" id="pdp-content">
        <div className="pdp__grid">
          {/* Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-image">
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem',
                opacity: 0.6,
              }}>
                {product.parentCategoryId === 'sacolas' && '🛍️'}
                {product.parentCategoryId === 'caixas' && '📦'}
                {product.parentCategoryId === 'sacos-ecommerce' && '📮'}
                {product.parentCategoryId === 'fitas' && '🎀'}
                {product.parentCategoryId === 'complementos' && '✨'}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="pdp__info">
            <span className="pdp__category">
              {product.categoryId?.replace(/-/g, ' ')}
            </span>

            <h1 className="pdp__title">{product.name}</h1>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  {'★'.repeat(Math.round(product.averageRating))}{'☆'.repeat(5 - Math.round(product.averageRating))}
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-500)' }}>
                  {product.averageRating} ({product.reviewCount} avaliações)
                </span>
              </div>
            )}

            <p className="pdp__short-desc">{product.description}</p>

            {/* Price Block */}
            <div className="pdp__price-block">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <span className="pdp__price">
                  {formatPrice(currentPrice)}
                  <span className="pdp__price-unit"> /{product.pricing.unit}</span>
                </span>
                {product.pricing.compareAtPrice && (
                  <span className="pdp__price-compare">
                    {formatPrice(product.pricing.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Bulk pricing table */}
              {product.pricing.bulkPrices && product.pricing.bulkPrices.length > 1 && (
                <table className="pdp__bulk-table">
                  <thead>
                    <tr>
                      <th>Quantidade</th>
                      <th>Preço unitário</th>
                      <th>Economia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.pricing.bulkPrices.map((bp, i) => {
                      const savings = product.pricing.bulkPrices[0].price - bp.price;
                      const isActive = currentPrice === bp.price;
                      return (
                        <tr key={i} style={isActive ? { background: 'var(--primary-50)', fontWeight: 600 } : {}}>
                          <td>{bp.label}</td>
                          <td style={isActive ? { color: 'var(--primary-600)', fontWeight: 700 } : {}}>
                            {formatPrice(bp.price)}
                          </td>
                          <td>
                            {savings > 0 ? (
                              <span className="badge badge--success">
                                -{Math.round((savings / product.pricing.bulkPrices[0].price) * 100)}%
                              </span>
                            ) : (
                              <span style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-xs)' }}>—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 0 0',
                borderTop: '1px solid var(--neutral-200)',
                marginTop: '0.75rem',
              }}>
                <span style={{ fontWeight: 600, color: 'var(--neutral-600)', fontSize: 'var(--text-sm)' }}>
                  Total ({quantity} {product.pricing.unit}{quantity > 1 ? 's' : ''}):
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--neutral-900)' }}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="pdp__quantity">
              <span className="pdp__quantity-label">Quantidade:</span>
              <div className="pdp__quantity-control">
                <button
                  className="pdp__quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <input
                  type="number"
                  className="pdp__quantity-input"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  id="pdp-quantity-input"
                />
                <button
                  className="pdp__quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pdp__actions">
              <button
                className="btn btn--primary btn--lg"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
                id="pdp-add-to-cart"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Shipping hint */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '1rem',
              background: 'var(--success-light)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--success)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--success)' }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Frete grátis no primeiro pedido!
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-600)' }}>
                Cadastre-se e ganhe frete grátis na sua primeira compra.
              </span>
            </div>

            {/* Specs */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1rem' }}>
                Especificações
              </h3>
              <div className="pdp__specs">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="pdp__spec-row">
                    <span className="pdp__spec-label">
                      {key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                    </span>
                    <span className="pdp__spec-value">
                      {typeof value === 'number' ? value : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              marginBottom: '2rem',
            }}>
              Produtos Relacionados
            </h2>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
