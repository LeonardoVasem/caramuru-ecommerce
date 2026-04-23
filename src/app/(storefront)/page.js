import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/storefront/ProductCard';
import { CATEGORIES } from '@/constants/categories';
import { fetchProductsFromFirestore } from '@/lib/firestore';

export const metadata = {
  title: 'Caramuru Sacolas — Embalagens de Qualidade para seu Negócio',
  description: 'Somos especialistas em embalagens personalizadas: sacolas de papel, plástico, TNT, caixas e muito mais. Atendemos atacado e varejo.',
};

export default async function HomePage() {
  const allProducts = await fetchProductsFromFirestore();
  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 8);

  return (
    <div className="page-enter">
      {/* Hero Section — with real banner image */}
      <section className="hero" id="hero-section">
        <div className="hero__bg-pattern" />
        <div className="hero__banner-image">
          <Image
            src="/images/hero-banner.png"
            alt="Embalagens premium — sacolas, caixas e fitas"
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.2 }}
          />
        </div>
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
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="benefits">
        <div className="container">
          <div className="benefits__grid">
            <div className="benefits__item">
              <div className="benefits__icon">💳</div>
              <div className="benefits__info">
                <div className="benefits__title">Até 5x sem juros</div>
                <div className="benefits__desc">No cartão de crédito</div>
              </div>
            </div>
            <div className="benefits__item">
              <div className="benefits__icon">💰</div>
              <div className="benefits__info">
                <div className="benefits__title">10% de desconto</div>
                <div className="benefits__desc">Pagando via PIX</div>
              </div>
            </div>
            <div className="benefits__item">
              <div className="benefits__icon">📝</div>
              <div className="benefits__info">
                <div className="benefits__title">Faça um orçamento!</div>
                <div className="benefits__desc">Quanto maior o volume, menor o preço</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories — Horizontal Scroll */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Categorias</h2>
            <Link href="/produtos" className="section__link">Ver todas →</Link>
          </div>
          <div className="categories-scroll">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/produtos?categoria=${category.slug}`}
                className="category-chip"
              >
                <div className="category-chip__icon">
                  {category.image ? (
                    <Image src={category.image} alt={category.name} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <span>{category.icon}</span>
                  )}
                </div>
                <span className="category-chip__name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Destaques da Semana</h2>
            <Link href="/produtos" className="section__link">Ver mais →</Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
