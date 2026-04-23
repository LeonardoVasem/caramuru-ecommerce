'use client';

import { useState, useEffect } from 'react';
import { seedProductsToFirestore } from '@/lib/firestore';

export default function AdminDashboard() {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    if (!confirm('Deseja sincronizar os produtos locais com o banco de dados Firebase?')) return;
    
    setSyncing(true);
    setMessage('');
    
    const result = await seedProductsToFirestore();
    
    if (result.success) {
      setMessage('✅ Sincronização concluída!');
    } else {
      setMessage('❌ Erro: ' + result.error);
    }
    setSyncing(false);
  };

  // Placeholder stats
  const stats = [
    { label: 'Pedidos Hoje', value: '12', change: '+18%', positive: true, icon: '🛒' },
    { label: 'Receita Mensal', value: 'R$ 24.500', change: '+7%', positive: true, icon: '💰' },
    { label: 'Clientes Novos', value: '34', change: '+12%', positive: true, icon: '👥' },
    { label: 'Produtos Ativos', value: '48', change: '0%', positive: true, icon: '📦' },
  ];

  const recentOrders = [
    { id: '#1234', client: 'Maria Silva', total: 'R$ 580,00', status: 'Pago', date: '21/04/2026' },
    { id: '#1233', client: 'João Santos', total: 'R$ 1.200,00', status: 'Enviado', date: '21/04/2026' },
    { id: '#1232', client: 'Ana Costa', total: 'R$ 340,00', status: 'Pendente', date: '20/04/2026' },
    { id: '#1231', client: 'Pedro Oliveira', total: 'R$ 890,00', status: 'Entregue', date: '20/04/2026' },
    { id: '#1230', client: 'Carla Souza', total: 'R$ 2.100,00', status: 'Pago', date: '19/04/2026' },
  ];

  const statusColors = {
    Pendente: 'var(--warning)',
    Pago: 'var(--info)',
    Enviado: 'var(--primary-500)',
    Entregue: 'var(--success)',
    Cancelado: 'var(--error)',
  };

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 800,
          margin: 0,
        }}>
          Dashboard
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {message && <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{message}</span>}
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="btn btn--primary"
            style={{ padding: '0.5rem 1rem', fontSize: '13px' }}
          >
            {syncing ? 'Sincronizando...' : '🔄 Sincronizar Firestore'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className="admin-stat-card__header">
              <span className="admin-stat-card__label">{stat.label}</span>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
            <div className="admin-stat-card__value">{stat.value}</div>
            <div className={`admin-stat-card__change ${stat.positive ? 'admin-stat-card__change--positive' : 'admin-stat-card__change--negative'}`}>
              {stat.change} vs. mês passado
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--neutral-150)',
        overflow: 'hidden',
        marginTop: '2rem',
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--neutral-150)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Pedidos Recentes</h2>
          <a href="/admin/pedidos" style={{ color: 'var(--primary-500)', fontWeight: 600, fontSize: 'var(--text-sm)', textDecoration: 'none' }}>
            Ver todos →
          </a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{order.id}</td>
                  <td>{order.client}</td>
                  <td style={{ fontWeight: 600 }}>{order.total}</td>
                  <td>
                    <span className="badge" style={{
                      background: `${statusColors[order.status]}15`,
                      color: statusColors[order.status],
                      border: `1px solid ${statusColors[order.status]}40`,
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--neutral-500)' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
