import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Caramuru Sacolas — Embalagens de Qualidade',
  description: 'Sacolas, caixas, fitas e embalagens para seu negócio. Frete grátis no primeiro pedido. Descontos por volume. Entrega para todo o Brasil.',
  keywords: 'sacolas, caixas, embalagens, fitas gomadas, sacolas plásticas, caixas papelão, e-commerce, atacado',
  openGraph: {
    title: 'Caramuru Sacolas — Embalagens de Qualidade',
    description: 'Sacolas, caixas, fitas e embalagens para seu negócio.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Caramuru Sacolas',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
