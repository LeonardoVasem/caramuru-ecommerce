'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/storefront/ProductCard';
import { fetchProductsFromFirestore } from '@/lib/firestore';
import { CATEGORIES, getAllCategories } from '@/constants/categories';

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProductsFromFirestore();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const allCategories = getAllCategories();

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.status === 'active');

    if (selectedCategory) {
      result = result.filter(
        (p) =>
          p.categoryId === selectedCategory ||
          p.parentCategoryId === selectedCategory
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term) ||
          p.specifications?.material?.toLowerCase().includes(term) ||
          p.specifications?.cor?.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricing.unitPrice - b.pricing.unitPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricing.unitPrice - a.pricing.unitPrice);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'bestseller':
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('featured');
  };

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="pdp__breadcrumb">
            <Link href="/">Início</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>Produtos</span>
            {selectedCategory && (
              <>
                <span className="pdp__breadcrumb-sep">/</span>
                <span style={{ color: 'var(--primary-500)', fontWeight: 600 }}>
                  {allCategories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="listing">
          {/* Sidebar */}
          <aside className="listing__sidebar" id="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-section__title">Buscar</h3>
              <input
                type="text"
                className="input"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="product-search-input"
              />
            </div>

            <div className="filter-section">
              <h3 className="filter-section__title">Categorias</h3>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                />
                Todas
                <span className="filter-option__count">{products.length}</span>
              </label>
              {CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <label className="filter-option" style={{ fontWeight: 600 }}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                    />
                    {cat.icon} {cat.name}
                    <span className="filter-option__count">
                      {products.filter((p) => p.parentCategoryId === cat.id).length}
                    </span>
                  </label>
                  {cat.children?.map((sub) => (
                    <label
                      key={sub.id}
                      className="filter-option"
                      style={{ paddingLeft: '2rem' }}
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === sub.slug}
                        onChange={() => setSelectedCategory(sub.slug)}
                      />
                      {sub.name}
                      <span className="filter-option__count">
                        {products.filter((p) => p.categoryId === sub.id).length}
                      </span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            {(selectedCategory || searchTerm) && (
              <button className="btn btn--outline btn--full btn--sm" onClick={clearFilters}>
                Limpar Filtros
              </button>
            )}
          </aside>

          <div className="listing__content" style={{ flex: 1 }}>
            <div className="listing__toolbar">
              <div className="listing__result-count">
                {!loading && (
                  <>
                    <strong>{filteredProducts.length}</strong> produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </>
                )}
              </div>
              <div className="listing__sort">
                <span>Ordenar:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="sort-select">
                  <option value="featured">Destaques</option>
                  <option value="bestseller">Mais Vendidos</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name">Nome A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="products-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 380, borderRadius: 'var(--radius-xl)' }} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="cart-empty">
                <div className="cart-empty__icon">🔍</div>
                <h2 className="cart-empty__title">Nenhum produto encontrado</h2>
                <p className="cart-empty__text">Tente ajustar seus filtros ou buscar por outro termo.</p>
                <button className="btn btn--primary" onClick={clearFilters}>Limpar Filtros</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
