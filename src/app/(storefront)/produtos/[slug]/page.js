'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/constants/products';
import ProductCard from '@/components/storefront/ProductCard';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';

const QTY_OPTIONS = [
  { value: 1000, label: '1.000 un' },
  { value: 2000, label: '2.000 un' },
  { value: 5000, label: '5.000 un' },
  { value: 10000, label: '10.000 un' },
];

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1000);
  const [showCustomQty, setShowCustomQty] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const q = query(collection(db, 'products'), where('slug', '==', slug));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const data = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
            setProduct(data);
            setQuantity(data.pricing?.bulkPrices?.[0]?.minQty || 1000);
            
            const relatedQ = query(
                collection(db, 'products'), 
                where('parentCategoryId', '==', data.parentCategoryId),
                where('status', '==', 'active')
            );
            getDocs(relatedQ).then(relSnap => {
                const relData = relSnap.docs
                    .map(d => ({ ...d.data(), id: d.id }))
                    .filter(p => p.id !== data.id)
                    .slice(0, 4);
                setRelatedProducts(relData);
            });
          }
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error loading product:", error);
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="skeleton" style={{ width: '100%', height: 300, borderRadius: '16px' }} />
      </div>
    );
  }

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

  // Calculate current price based on quantity tiers
  const getCurrentPrice = () => {
    const base = product.pricing.unitPrice;
    if (quantity >= 10000) return base * 0.82;
    if (quantity >= 5000) return base * 0.88;
    if (quantity >= 2000) return base * 0.95;
    return base;
  };

  const currentPrice = getCurrentPrice();
  const totalPrice = currentPrice * quantity;

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
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container pdp" id="pdp-content">
        {/* Image — full-width on mobile, inside container padding */}
        <div className="pdp__gallery">
          <div className="pdp__main-image">
            {product.featuredImage && product.featuredImage.startsWith('http') ? (
              <Image 
                src={product.featuredImage} 
                alt={product.name} 
                fill 
                priority
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
              />
            ) : product.featuredImage ? (
              <Image 
                src={product.featuredImage} 
                alt={product.name} 
                fill 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '6rem', opacity: 0.5,
              }}>
                📦
              </div>
            )}
          </div>
        </div>

        {/* Product Info — all padded properly */}
        <div className="pdp__info">
          <span className="pdp__category">
            {product.categoryId?.replace(/-/g, ' ')}
          </span>

          <h1 className="pdp__title">{product.name}</h1>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#F5A623', fontWeight: 700 }}>
                {'★'.repeat(Math.round(product.averageRating))}{'☆'.repeat(5 - Math.round(product.averageRating))}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--neutral-500)' }}>
                {product.averageRating} ({product.reviewCount} avaliações)
              </span>
            </div>
          )}

          {product.description && (
            <p className="pdp__short-desc">{product.description}</p>
          )}

          {/* Price */}
          <div className="pdp__price-block">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span className="pdp__price">
                {formatPrice(currentPrice)}
              </span>
              <span className="pdp__price-unit">/{product.pricing.unit}</span>
              {product.pricing.compareAtPrice && (
                <span className="pdp__price-compare">
                  {formatPrice(product.pricing.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Bulk pricing table — fixed quantities */}
            <table className="pdp__bulk-table">
              <thead>
                <tr>
                  <th>Quantidade</th>
                  <th>Preço/un</th>
                  <th>Economia</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { qty: 1000, label: '1.000 un', discount: 0 },
                  { qty: 2000, label: '2.000 un', discount: 0.05 },
                  { qty: 5000, label: '5.000 un', discount: 0.12 },
                  { qty: 10000, label: '10.000 un', discount: 0.18 },
                ].map((tier) => {
                  const tierPrice = product.pricing.unitPrice * (1 - tier.discount);
                  const isActive = quantity === tier.qty && !showCustomQty;
                  return (
                    <tr key={tier.qty} 
                      style={{ 
                        background: isActive ? 'var(--primary-50)' : 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={() => { setQuantity(tier.qty); setShowCustomQty(false); }}
                    >
                      <td style={{ fontWeight: isActive ? 700 : 400 }}>{tier.label}</td>
                      <td style={{ fontWeight: 700, color: isActive ? 'var(--primary-600)' : 'inherit' }}>
                        {formatPrice(tierPrice)}
                      </td>
                      <td>
                        {tier.discount > 0 ? (
                          <span style={{ 
                            color: '#16a34a', fontWeight: 600, fontSize: '12px',
                            background: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' 
                          }}>
                            -{Math.round(tier.discount * 100)}%
                          </span>
                        ) : (
                          <span style={{ color: 'var(--neutral-300)', fontSize: '12px' }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0 0', borderTop: '1px solid var(--neutral-200)', marginTop: '8px',
            }}>
              <span style={{ fontWeight: 600, color: 'var(--neutral-600)', fontSize: '13px' }}>
                Total ({quantity.toLocaleString('pt-BR')} {product.pricing.unit}):
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <span className="pdp__quantity-label">Quantidade:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {QTY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`btn ${quantity === opt.value && !showCustomQty ? 'btn--primary' : 'btn--outline'} btn--sm`}
                  onClick={() => { setQuantity(opt.value); setShowCustomQty(false); }}
                  style={{ minWidth: '80px', fontSize: '13px' }}
                >
                  {opt.label}
                </button>
              ))}
              <button
                className={`btn ${showCustomQty ? 'btn--primary' : 'btn--outline'} btn--sm`}
                onClick={() => setShowCustomQty(true)}
                style={{ minWidth: '80px', fontSize: '13px' }}
              >
                Outra
              </button>
            </div>
            {showCustomQty && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                <input
                  type="number"
                  className="input"
                  style={{ width: '130px' }}
                  min={1000} step={100}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1000, parseInt(e.target.value) || 1000))}
                  id="pdp-custom-quantity"
                />
                <span style={{ fontSize: '12px', color: 'var(--neutral-500)' }}>unidades (mín. 1.000)</span>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <button
            className="btn btn--primary btn--lg"
            style={{ width: '100%', fontSize: '15px', padding: '14px' }}
            onClick={handleAddToCart}
            id="pdp-add-to-cart"
          >
            🛒 Adicionar ao Carrinho — {formatPrice(totalPrice)}
          </button>

          {/* Shipping hint */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '4px',
            padding: '12px 16px', background: '#f0fdf4',
            borderRadius: '10px', border: '1px solid #bbf7d0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#16a34a', fontSize: '13px' }}>
              ✅ Frete grátis no primeiro pedido!
            </div>
            <span style={{ fontSize: '12px', color: 'var(--neutral-600)' }}>
              Cadastre-se e ganhe frete grátis na sua primeira compra.
            </span>
          </div>

          {/* Specs */}
          {Object.keys(specs).length > 0 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>
                Especificações
              </h3>
              <div className="pdp__specs">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="pdp__spec-row">
                    <span className="pdp__spec-label">
                      {key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                    </span>
                    <span className="pdp__spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
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
