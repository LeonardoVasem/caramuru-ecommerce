import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export const metadata = {
  title: 'Produtos | Caramuru Sacolas',
  description: 'Explore nossa linha completa de embalagens: sacolas, caixas, fitas, envelopes e muito mais. Preços de atacado com desconto por volume.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="skeleton" style={{ width: '100%', height: 400 }} />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
