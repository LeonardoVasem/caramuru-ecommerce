'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/constants/products';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const discount = product.pricing.compareAtPrice
    ? Math.round((1 - product.pricing.unitPrice / product.pricing.compareAtPrice) * 100)
    : 0;

  const bestBulk = product.pricing.bulkPrices?.[product.pricing.bulkPrices.length - 1];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const minQty = product.pricing.bulkPrices?.[0]?.minQty || 1;
    addItem(product, minQty);
  };

  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      {/* Badges */}
      <div className="product-card__badges">
        {discount > 0 && (
          <span className="product-card__badge product-card__badge--sale">
            -{discount}%
          </span>
        )}
        {product.tags?.includes('novo') && (
          <span className="product-card__badge product-card__badge--new">Novo</span>
        )}
        {product.tags?.includes('mais-vendido') && (
          <span className="product-card__badge product-card__badge--bestseller">
            Mais Vendido
          </span>
        )}
      </div>

      {/* Image */}
      <div className="product-card__image">
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          opacity: 0.6,
        }}>
          {product.parentCategoryId === 'sacolas' && '🛍️'}
          {product.parentCategoryId === 'caixas' && '📦'}
          {product.parentCategoryId === 'sacos-ecommerce' && '📮'}
          {product.parentCategoryId === 'fitas' && '🎀'}
          {product.parentCategoryId === 'complementos' && '✨'}
        </div>

        {/* Quick actions */}
        <div className="product-card__quick-actions">
          <button className="product-card__quick-btn" title="Ver detalhes" aria-label="Ver detalhes">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__category">
          {product.categoryId?.replace(/-/g, ' ')}
        </span>

        <h3 className="product-card__name">
          <Link href={`/produtos/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Specs */}
        <div className="product-card__specs">
          {product.specifications?.material && (
            <span className="product-card__spec">{product.specifications.material.split(' ')[0]}</span>
          )}
          {product.specifications?.cor && (
            <span className="product-card__spec">{product.specifications.cor}</span>
          )}
          {product.specifications?.largura && product.specifications?.altura && (
            <span className="product-card__spec">
              {product.specifications.largura}x{product.specifications.altura}cm
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="product-card__pricing">
          <span className="product-card__price">
            {formatPrice(product.pricing.unitPrice)}
          </span>
          <span className="product-card__price-unit">
            /{product.pricing.unit}
          </span>
          {product.pricing.compareAtPrice && (
            <span className="product-card__price-compare">
              {formatPrice(product.pricing.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Bulk hint */}
        {bestBulk && (
          <div className="product-card__bulk-hint">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            A partir de {formatPrice(bestBulk.price)} ({bestBulk.label})
          </div>
        )}

        {/* Add button */}
        <button
          className="product-card__add-btn"
          onClick={handleAddToCart}
          id={`add-to-cart-${product.id}`}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Adicionar
        </button>
      </div>
    </div>
  );
}
