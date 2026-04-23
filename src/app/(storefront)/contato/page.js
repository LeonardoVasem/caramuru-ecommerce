import Link from 'next/link';

export const metadata = {
  title: 'Contato | Caramuru Sacolas',
  description: 'Entre em contato com a Caramuru Sacolas. Atendimento via WhatsApp, email e telefone. Estamos prontos para ajudar.',
};

export default function ContactPage() {
  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="pdp__breadcrumb">
            <Link href="/">Início</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>Contato</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section__header">
            <p className="section__eyebrow">Contato</p>
            <h1 className="section__title">Fale Conosco</h1>
            <p className="section__subtitle">
              Estamos prontos para atender você. Escolha o melhor canal de comunicação.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/5500000000000?text=Olá! Gostaria de mais informações sobre os produtos."
              target="_blank"
              rel="noopener noreferrer"
              className="feature-card"
              style={{ textDecoration: 'none', cursor: 'pointer', borderColor: '#25D366' }}
              id="contact-whatsapp"
            >
              <div className="feature-card__icon" style={{ background: '#dcfce7', color: '#25D366' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="feature-card__title">WhatsApp</h3>
              <p className="feature-card__desc">Atendimento rápido e direto pelo WhatsApp. Disponível em horário comercial.</p>
              <span className="badge badge--success" style={{ marginTop: '0.5rem' }}>Online agora</span>
            </a>

            {/* Email */}
            <a
              href="mailto:contato@caramurusacolas.com.br"
              className="feature-card"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              id="contact-email"
            >
              <div className="feature-card__icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-card__title">E-mail</h3>
              <p className="feature-card__desc">contato@caramurusacolas.com.br</p>
              <p className="feature-card__desc" style={{ fontSize: 'var(--text-xs)' }}>Resposta em até 24 horas</p>
            </a>

            {/* Phone */}
            <div className="feature-card" id="contact-phone">
              <div className="feature-card__icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Telefone</h3>
              <p className="feature-card__desc">(XX) XXXX-XXXX</p>
              <p className="feature-card__desc" style={{ fontSize: 'var(--text-xs)' }}>Seg-Sex, 8h às 18h</p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'var(--neutral-50)',
            borderRadius: 'var(--radius-2xl)',
            padding: '2.5rem',
            border: '1px solid var(--neutral-150)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}>
              Envie uma Mensagem
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label className="label" htmlFor="contact-name">Nome completo</label>
                  <input type="text" id="contact-name" className="input" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="label" htmlFor="contact-email-input">E-mail</label>
                  <input type="email" id="contact-email-input" className="input" placeholder="seu@email.com" />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="contact-phone-input">Telefone</label>
                <input type="tel" id="contact-phone-input" className="input" placeholder="(XX) XXXXX-XXXX" />
              </div>

              <div>
                <label className="label" htmlFor="contact-subject">Assunto</label>
                <select id="contact-subject" className="input" style={{ cursor: 'pointer' }}>
                  <option value="">Selecione um assunto</option>
                  <option value="orcamento">Orçamento personalizado</option>
                  <option value="duvida">Dúvida sobre produto</option>
                  <option value="pedido">Acompanhar pedido</option>
                  <option value="troca">Trocas e devoluções</option>
                  <option value="outro">Outro assunto</option>
                </select>
              </div>

              <div>
                <label className="label" htmlFor="contact-message">Mensagem</label>
                <textarea
                  id="contact-message"
                  className="input"
                  placeholder="Como podemos ajudar?"
                  rows={5}
                  style={{ height: 'auto', padding: '0.75rem 1rem', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn--primary btn--lg" style={{ alignSelf: 'flex-start' }}>
                Enviar Mensagem
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
