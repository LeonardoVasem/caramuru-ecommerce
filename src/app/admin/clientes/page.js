'use client';

const MOCK_CLIENTS = [
  { id: 'c1', name: 'Maria Silva', email: 'maria@email.com', orders: 8, totalSpent: 4600, lastOrder: '2026-04-21', isFirstPurchase: false },
  { id: 'c2', name: 'João Santos', email: 'joao@email.com', orders: 3, totalSpent: 2100, lastOrder: '2026-04-21', isFirstPurchase: false },
  { id: 'c3', name: 'Ana Costa', email: 'ana@email.com', orders: 1, totalSpent: 340, lastOrder: '2026-04-20', isFirstPurchase: true },
  { id: 'c4', name: 'Pedro Oliveira', email: 'pedro@email.com', orders: 12, totalSpent: 8900, lastOrder: '2026-04-20', isFirstPurchase: false },
  { id: 'c5', name: 'Carla Souza', email: 'carla@email.com', orders: 5, totalSpent: 5200, lastOrder: '2026-04-19', isFirstPurchase: false },
];

export default function AdminClientsPage() {
  const formatPrice = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  return (
    <div className="page-enter">
      <div className="admin-action-bar">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
          Clientes
        </h1>
        <span style={{ color: 'var(--neutral-500)', fontSize: 'var(--text-sm)' }}>
          {MOCK_CLIENTS.length} clientes cadastrados
        </span>
      </div>

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
                <th>Cliente</th>
                <th>Pedidos</th>
                <th>Total Gasto</th>
                <th>Último Pedido</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CLIENTS.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'var(--primary-100)',
                        color: 'var(--primary-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 'var(--text-sm)',
                      }}>
                        {client.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{client.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-400)' }}>{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{client.orders}</td>
                  <td style={{ fontWeight: 600 }}>{formatPrice(client.totalSpent)}</td>
                  <td style={{ color: 'var(--neutral-500)' }}>
                    {new Date(client.lastOrder).toLocaleDateString('pt-BR')}
                  </td>
                  <td>
                    {client.isFirstPurchase ? (
                      <span className="badge badge--warning">Novo</span>
                    ) : (
                      <span className="badge badge--success">Recorrente</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
