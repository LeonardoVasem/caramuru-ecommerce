'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <Link href={`/produtos/${product.slug}`} className="product-card" id={`product-card-${product.id}`}>
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
        {product.featuredImage && product.featuredImage.startsWith('http') ? (
          <Image 
            src={product.featuredImage} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
            unoptimized={true}
          />
        ) : product.featuredImage ? (
          <Image 
            src={product.featuredImage} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
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
        )}
      </div>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__category">
          {product.categoryId?.replace(/-/g, ' ')}
        </span>

        <h3 className="product-card__name">
          {product.name}
        </h3>

        {/* Specs */}
        <div className="product-card__specs">
          {product.specifications?.material && (
            <span className="product-card__spec">{product.specifications.material.split(' ')[0]}</span>
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
        </div>

        {/* CTA — navigates via parent Link */}
        <span className="product-card__add-btn">
          Ver Detalhes
        </span>
      </div>
    </Link>
  );
}
