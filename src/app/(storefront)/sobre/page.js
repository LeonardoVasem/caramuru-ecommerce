import Link from 'next/link';

export const metadata = {
  title: 'Sobre Nós | Caramuru Sacolas',
  description: 'Conheça a Caramuru Sacolas — sua parceira em embalagens de qualidade. Tradição, confiança e os melhores preços do mercado.',
};

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="pdp__breadcrumb">
            <Link href="/">Início</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>Sobre Nós</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-700) 0%, var(--primary-500) 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 800,
            marginBottom: '1.5rem',
            color: 'white',
          }}>
            Sobre a Caramuru
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Somos especialistas em embalagens para comércio e e-commerce.
            Nossa missão é oferecer qualidade, preço justo e entrega rápida.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Mission */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: '1rem' }}>
                🎯 Nossa Missão
              </h2>
              <p style={{ color: 'var(--neutral-600)', lineHeight: 1.8 }}>
                Facilitar o acesso a embalagens de qualidade para comerciantes e empreendedores de todo o Brasil.
                Acreditamos que uma boa embalagem faz diferença na experiência do cliente e no sucesso do seu negócio.
              </p>
            </div>

            {/* Values */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: '1.5rem' }}>
                💎 Nossos Valores
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {[
                  { icon: '🏆', title: 'Qualidade', desc: 'Trabalhamos apenas com materiais de primeira linha.' },
                  { icon: '💰', title: 'Preço Justo', desc: 'Descontos progressivos que fazem diferença no seu custo.' },
                  { icon: '🚀', title: 'Agilidade', desc: 'Entrega rápida para que seu negócio não pare.' },
                  { icon: '🤝', title: 'Confiança', desc: 'Transparência total em cada etapa da compra.' },
                ].map((value) => (
                  <div key={value.title} style={{
                    padding: '1.5rem',
                    background: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--neutral-150)',
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{value.icon}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      {value.title}
                    </h3>
                    <p style={{ color: 'var(--neutral-500)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Numbers */}
            <div style={{
              background: 'var(--neutral-900)',
              color: 'white',
              borderRadius: 'var(--radius-2xl)',
              padding: '3rem',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: 'white',
                marginBottom: '2rem',
                textAlign: 'center',
              }}>
                Nossos Números
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                textAlign: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--primary-400)' }}>
                    500+
                  </div>
                  <div style={{ color: 'var(--neutral-400)', marginTop: '0.5rem', fontSize: 'var(--text-sm)' }}>
                    Clientes Satisfeitos
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--accent)' }}>
                    12k+
                  </div>
                  <div style={{ color: 'var(--neutral-400)', marginTop: '0.5rem', fontSize: 'var(--text-sm)' }}>
                    Pedidos Entregues
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--success)' }}>
                    4.8★
                  </div>
                  <div style={{ color: 'var(--neutral-400)', marginTop: '0.5rem', fontSize: 'var(--text-sm)' }}>
                    Avaliação Média
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: '1rem' }}>
                Pronto para começar?
              </h2>
              <p style={{ color: 'var(--neutral-500)', marginBottom: '2rem' }}>
                Explore nossos produtos e encontre a embalagem perfeita para seu negócio.
              </p>
              <Link href="/produtos" className="btn btn--primary btn--lg">
                Ver Produtos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
