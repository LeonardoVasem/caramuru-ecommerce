import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/storefront/ProductCard';
import { CATEGORIES } from '@/constants/categories';
import { getFeaturedProducts, formatPrice } from '@/constants/products';

export const metadata = {
  title: 'Caramuru Sacolas — Embalagens de Qualidade para seu Negócio',
  description: 'Compre sacolas, caixas, fitas e embalagens com os melhores preços. Frete grátis no primeiro pedido. Desconto por volume. Entrega para todo o Brasil.',
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="page-enter">
      {/* ====== HERO ====== */}
      <section className="hero" id="hero-section">
        <div className="hero__bg-pattern" />
        <div className="container hero__content">
          <div className="hero__text">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Frete grátis no primeiro pedido
            </div>
            <h1 className="hero__title">
              Embalagens que
              <span>valorizam</span>
              seu negócio.
            </h1>
            <p className="hero__subtitle">
              Sacolas, caixas, fitas e tudo que você precisa para embalar com qualidade.
              Preços de atacado, entrega rápida e descontos exclusivos por volume.
            </p>
            <div className="hero__actions">
              <Link href="/produtos" className="btn btn--white btn--lg">
                Ver Produtos
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contato" className="btn btn--outline-white btn--lg">
                Fale Conosco
              </Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">500+</span>
                <span className="hero__stat-label">Clientes ativos</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">12k+</span>
                <span className="hero__stat-label">Pedidos entregues</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">4.8★</span>
                <span className="hero__stat-label">Avaliação média</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-wrapper">
              <Image
                src="/images/hero-banner.png"
                alt="Embalagens Caramuru — sacolas, caixas e fitas de qualidade"
                fill
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-2xl)' }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating cards */}
            <div className="hero__float-card hero__float-card--left">
              <div className="hero__float-card-label">Economia</div>
              <div className="hero__float-card-value" style={{ color: '#10B981' }}>-30%</div>
              <div className="hero__float-card-sub">no atacado</div>
            </div>
            <div className="hero__float-card hero__float-card--right">
              <div className="hero__float-card-label">Entrega</div>
              <div className="hero__float-card-value">3-5 dias</div>
              <div className="hero__float-card-sub">para todo Brasil</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="section" id="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="feature-card__title">Variedade Completa</h3>
              <p className="feature-card__desc">Sacolas, caixas, fitas, envelopes e muito mais em um só lugar.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Preço de Atacado</h3>
              <p className="feature-card__desc">Descontos progressivos: quanto mais compra, menos paga.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Entrega Rápida</h3>
              <p className="feature-card__desc">Enviamos para todo o Brasil com rastreamento em tempo real.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Compra Segura</h3>
              <p className="feature-card__desc">Pagamento via Pix, boleto ou cartão com total segurança.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="section section--gray" id="categories-section">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">Categorias</p>
            <h2 className="section__title">Encontre a Embalagem Ideal</h2>
            <p className="section__subtitle">
              Navegue por nossas categorias e encontre exatamente o que seu negócio precisa.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/produtos?categoria=${cat.slug}`}
                className="category-card"
                id={`category-${cat.id}`}
              >
                <div className="category-card__image">
                  <span className="category-card__icon">{cat.icon}</span>
                </div>
                <div className="category-card__body">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__count">
                    {cat.children?.length || 0} subcategorias
                  </p>
                  <div className="category-card__arrow">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED PRODUCTS ====== */}
      <section className="section" id="featured-products-section">
        <div className="container">
          <div className="section__header">
            <p className="section__eyebrow">Destaques</p>
            <h2 className="section__title">Mais Vendidos</h2>
            <p className="section__subtitle">
              Os produtos preferidos pelos nossos clientes. Qualidade comprovada com os melhores preços.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/produtos" className="btn btn--primary btn--lg">
              Ver Todos os Produtos
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CTA Banner ====== */}
      <section className="section" id="cta-section">
        <div className="container">
          <div className="cta-banner" style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/images/cta-banner.png"
              alt=""
              fill
              style={{ objectFit: 'cover', opacity: 0.35 }}
              sizes="100vw"
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 className="cta-banner__title">Primeiro Pedido? Frete Grátis! 🚚</h2>
              <p className="cta-banner__text">
                Cadastre-se agora e aproveite frete grátis na sua primeira compra.
                Sem valor mínimo, sem complicação.
              </p>
              <div className="cta-banner__actions">
                <Link href="/produtos" className="btn btn--primary btn--lg">
                  Comprar Agora
                </Link>
                <Link href="/contato" className="btn btn--outline-white btn--lg">
                  Tirar Dúvidas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
