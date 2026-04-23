'use client';

import { useState } from 'react';

const MOCK_ORDERS = [
  { id: '#1234', client: 'Maria Silva', email: 'maria@email.com', items: 3, total: 580.00, status: 'paid', payment: 'PIX', date: '2026-04-21' },
  { id: '#1233', client: 'João Santos', email: 'joao@email.com', items: 5, total: 1200.00, status: 'shipped', payment: 'Cartão', date: '2026-04-21' },
  { id: '#1232', client: 'Ana Costa', email: 'ana@email.com', items: 1, total: 340.00, status: 'pending', payment: 'Boleto', date: '2026-04-20' },
  { id: '#1231', client: 'Pedro Oliveira', email: 'pedro@email.com', items: 7, total: 890.00, status: 'delivered', payment: 'PIX', date: '2026-04-20' },
  { id: '#1230', client: 'Carla Souza', email: 'carla@email.com', items: 10, total: 2100.00, status: 'paid', payment: 'Cartão', date: '2026-04-19' },
  { id: '#1229', client: 'Lucas Ferreira', email: 'lucas@email.com', items: 2, total: 190.00, status: 'cancelled', payment: 'PIX', date: '2026-04-19' },
  { id: '#1228', client: 'Julia Almeida', email: 'julia@email.com', items: 4, total: 720.00, status: 'delivered', payment: 'Boleto', date: '2026-04-18' },
];

const STATUS_MAP = {
  pending: { label: 'Pendente', color: 'var(--warning)' },
  paid: { label: 'Pago', color: 'var(--info)' },
  shipped: { label: 'Enviado', color: 'var(--primary-500)' },
  delivered: { label: 'Entregue', color: 'var(--success)' },
  cancelled: { label: 'Cancelado', color: 'var(--error)' },
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchSearch = o.client.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatPrice = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  return (
    <div className="page-enter">
      <div className="admin-action-bar">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
          Pedidos
        </h1>
      </div>

      {/* Status quick filters */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'Todos', count: MOCK_ORDERS.length },
          ...Object.entries(STATUS_MAP).map(([key, val]) => ({
            key,
            label: val.label,
            count: MOCK_ORDERS.filter((o) => o.status === key).length,
          })),
        ].map((filter) => (
          <button
            key={filter.key}
            className={`btn btn--sm ${statusFilter === filter.key ? 'btn--primary' : 'btn--outline'}`}
            onClick={() => setStatusFilter(filter.key)}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 'var(--space-6)', maxWidth: 400 }}>
        <input
          type="text"
          className="input"
          placeholder="Buscar por cliente ou nº do pedido..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="admin-order-search"
        />
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
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Pagamento</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const status = STATUS_MAP[order.status];
                return (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 700, color: 'var(--primary-600)' }}>{order.id}</td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 500 }}>{order.client}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-400)' }}>{order.email}</div>
                      </div>
                    </td>
                    <td>{order.items}</td>
                    <td style={{ fontWeight: 600 }}>{formatPrice(order.total)}</td>
                    <td>
                      <span className="badge badge--primary">{order.payment}</span>
                    </td>
                    <td>
                      <span className="badge" style={{
                        background: `${status.color}15`,
                        color: status.color,
                        border: `1px solid ${status.color}40`,
                      }}>
                        {status.label}
                      </span>
                    </td>
                    <td style={{ color: 'var(--neutral-500)' }}>
                      {new Date(order.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td>
                      <button className="btn btn--ghost btn--sm" style={{ padding: '4px 8px' }} title="Ver detalhes">
                        👁️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)' }}>
        Mostrando {filtered.length} de {MOCK_ORDERS.length} pedidos
      </div>
    </div>
  );
}
