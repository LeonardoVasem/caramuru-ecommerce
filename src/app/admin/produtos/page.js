'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, formatPrice } from '@/constants/products';

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="page-enter">
      <div className="admin-action-bar">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
          Produtos
        </h1>
        <button className="btn btn--primary" id="admin-add-product-btn">
          + Novo Produto
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="admin-action-bar__search">
          <input
            type="text"
            className="input"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="admin-product-search"
          />
        </div>
        <select
          className="input"
          style={{ width: 160 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          id="admin-product-status-filter"
        >
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
          <option value="draft">Rascunho</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--neutral-150)',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--neutral-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        flexShrink: 0,
                      }}>
                        {product.parentCategoryId === 'sacolas' && '🛍️'}
                        {product.parentCategoryId === 'caixas' && '📦'}
                        {product.parentCategoryId === 'sacos-ecommerce' && '📮'}
                        {product.parentCategoryId === 'fitas' && '🎀'}
                        {product.parentCategoryId === 'complementos' && '✨'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{product.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-400)' }}>{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {product.categoryId?.replace(/-/g, ' ')}
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {formatPrice(product.pricing.unitPrice)}
                    <span style={{ color: 'var(--neutral-400)', fontWeight: 400 }}> /{product.pricing.unit}</span>
                  </td>
                  <td>
                    <span style={{
                      color: product.inventory.stock <= product.inventory.lowStockThreshold ? 'var(--error)' : 'var(--neutral-700)',
                      fontWeight: product.inventory.stock <= product.inventory.lowStockThreshold ? 600 : 400,
                    }}>
                      {product.inventory.stock.toLocaleString('pt-BR')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${product.status === 'active' ? 'badge--success' : 'badge--warning'}`}>
                      {product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn--ghost btn--sm" style={{ padding: '4px 8px' }} title="Editar">
                        ✏️
                      </button>
                      <Link href={`/produtos/${product.slug}`} className="btn btn--ghost btn--sm" style={{ padding: '4px 8px' }} title="Ver na loja">
                        👁️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)' }}>
        Mostrando {filtered.length} de {PRODUCTS.length} produtos
      </div>
    </div>
  );
}
