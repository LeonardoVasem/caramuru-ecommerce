'use client';

export default function AdminCouponsPage() {
  const coupons = [
    { code: 'PRIMEIRACOMPRA', discount: 'Frete Grátis', type: 'shipping', uses: 34, limit: null, status: 'active', expiry: null },
    { code: 'ATACADO10', discount: '10% off', type: 'percentage', uses: 12, limit: 100, status: 'active', expiry: '2026-06-30' },
    { code: 'BEMVINDO', discount: 'R$ 20 off', type: 'fixed', uses: 56, limit: 200, status: 'active', expiry: '2026-12-31' },
  ];

  return (
    <div className="page-enter">
      <div className="admin-action-bar">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
          Cupons
        </h1>
        <button className="btn btn--primary" id="admin-add-coupon-btn">
          + Novo Cupom
        </button>
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
                <th>Código</th>
                <th>Desconto</th>
                <th>Usos</th>
                <th>Limite</th>
                <th>Validade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.code}>
                  <td>
                    <code style={{
                      background: 'var(--neutral-100)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 700,
                      color: 'var(--primary-600)',
                      fontSize: 'var(--text-sm)',
                    }}>
                      {coupon.code}
                    </code>
                  </td>
                  <td style={{ fontWeight: 500 }}>{coupon.discount}</td>
                  <td>{coupon.uses}</td>
                  <td>{coupon.limit || '∞'}</td>
                  <td style={{ color: 'var(--neutral-500)' }}>
                    {coupon.expiry ? new Date(coupon.expiry).toLocaleDateString('pt-BR') : 'Sem validade'}
                  </td>
                  <td>
                    <span className={`badge ${coupon.status === 'active' ? 'badge--success' : 'badge--error'}`}>
                      {coupon.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn--ghost btn--sm" style={{ padding: '4px 8px' }} title="Editar">
                      ✏️
                    </button>
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
