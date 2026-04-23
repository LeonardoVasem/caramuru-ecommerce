import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/storefront/ProductCard';
import { CATEGORIES } from '@/constants/categories';
import { fetchProductsFromFirestore } from '@/lib/firestore';
import { formatPrice } from '@/constants/products';

export const metadata = {
  title: 'Caramuru Sacolas — Embalagens de Qualidade para seu Negócio',
  description: 'Somos especialistas em embalagens personalizadas: sacolas de papel, plástico, TNT, caixas e muito mais. Atendemos atacado e varejo.',
};

export default async function HomePage() {
  const allProducts = await fetchProductsFromFirestore();
  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 8);

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <h1 className="hero__title">
                Embalagens que <span className="text-primary">valorizam</span> seu negócio.
              </h1>
              <p className="hero__text">
                Sacolas, caixas, fitas e tudo que você precisa para embalar com qualidade. Preços de atacado, entrega rápida e descontos exclusivos por volume.
              </p>
              <div className="hero__actions">
                <Link href="/produtos" className="btn btn--primary btn--lg">
                  Ver Produtos →
                </Link>
                <Link href="/contato" className="btn btn--outline btn--lg">
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar - Estilo Magnani */}
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

      {/* Featured Categories */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Nossas Categorias</h2>
            <Link href="/produtos" className="section__link">Ver todas →</Link>
          </div>
          <div className="categories-grid">
            {CATEGORIES.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/produtos?categoria=${category.slug}`}
                className="category-card"
              >
                <div className="category-card__image">
                   {category.image ? (
                     <Image src={category.image} alt={category.name} fill style={{ objectFit: 'contain' }} />
                   ) : (
                     <div style={{ fontSize: '3rem' }}>{category.icon}</div>
                   )}
                </div>
                <h3 className="category-card__name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section--bg">
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
