'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { formatPrice } from '@/constants/products';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Real-time listener for products from Firestore
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error listening to products:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateProduct = async (id, data) => {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, { ...data, updatedAt: new Date() });
      if (!uploading) setEditingProduct(null); // Only close if not in the middle of an upload
    } catch (error) {
      alert('Erro ao atualizar produto: ' + error.message);
    }
  };

  const handleImageUpload = async (file) => {
    if (!editingProduct || !file) return;
    
    setUploading(true);
    try {
      // Create a professional path for the image
      const fileExt = file.name.split('.').pop();
      const fileName = `featured_${Date.now()}.${fileExt}`;
      const storageRef = ref(storage, `products/${editingProduct.id}/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      const docRef = doc(db, 'products', editingProduct.id);
      await updateDoc(docRef, { 
        featuredImage: downloadURL,
        updatedAt: new Date()
      });
      
      // Update local state for the modal
      setEditingProduct({...editingProduct, featuredImage: downloadURL});
      alert('Imagem atualizada com sucesso!');
    } catch (error) {
      alert('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <div className="skeleton" style={{ width: '100%', height: 400 }} />
      <p style={{ marginTop: '1rem', color: 'var(--neutral-500)' }}>Carregando catálogo do Firestore...</p>
    </div>
  );

  return (
    <div className="page-enter">
      <div className="admin-action-bar">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
          Produtos
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
             {products.length === 0 && (
               <span style={{ fontSize: '12px', color: 'var(--warning)', background: 'var(--warning-50)', padding: '4px 12px', borderRadius: '4px' }}>
                ⚠️ Nenhum produto no Firestore. Vá ao Dashboard e clique em "Sincronizar".
              </span>
             )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="admin-action-bar__search" style={{ flex: 1 }}>
          <input
            type="text"
            className="input"
            placeholder="Buscar produtos pelo nome..."
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
          <option value="all">Todos Status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--neutral-150)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço Base</th>
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
                        width: 56,
                        height: 56,
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--neutral-100)',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid var(--neutral-150)'
                      }}>
                        {product.featuredImage ? (
                          <Image src={product.featuredImage} alt={product.name} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '1.5rem' }}>
                             📦
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--neutral-900)' }}>{product.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 'var(--text-xs)', background: 'var(--neutral-100)', padding: '2px 8px', borderRadius: '4px', textTransform: 'capitalize' }}>
                        {product.categoryId?.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    {formatPrice(product.pricing?.unitPrice || 0)}
                    <span style={{ color: 'var(--neutral-400)', fontWeight: 400, fontSize: '12px' }}> /{product.pricing?.unit}</span>
                  </td>
                  <td>
                    <span className={`badge ${product.status === 'active' ? 'badge--success' : 'badge--warning'}`}>
                      {product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button 
                        className="btn btn--primary btn--sm" 
                        style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600 }}
                        onClick={() => setEditingProduct(product)}
                      >
                        Gerenciar
                      </button>
                      <Link href={`/produtos/${product.slug}`} target="_blank" className="btn btn--ghost btn--sm" style={{ padding: '6px' }} title="Ver na loja">
                        🔗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div className="modal-content page-enter" style={{
                background: 'white', borderRadius: 'var(--radius-2xl)', 
                width: '100%', maxWidth: '500px', padding: '2.5rem',
                boxShadow: 'var(--shadow-2xl)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: 0 }}>Gerenciar Produto</h2>
                    <button onClick={() => setEditingProduct(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--neutral-400)' }}>×</button>
                </div>

                {/* Image Section */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--neutral-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--neutral-150)' }}>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '1rem', color: 'var(--neutral-800)' }}>Foto do Produto</label>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ 
                            width: 100, height: 100, borderRadius: 'var(--radius-lg)', 
                            background: 'white', overflow: 'hidden', position: 'relative',
                            border: '1px solid var(--neutral-200)', boxShadow: 'var(--shadow-sm)'
                        }}>
                            {editingProduct.featuredImage ? (
                                <Image src={editingProduct.featuredImage} alt="" fill style={{ objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2rem' }}>📦</div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '11px', color: 'var(--neutral-500)', marginBottom: '10px' }}>
                                Use imagens quadradas (1:1) de alta qualidade para melhor resultado.
                            </p>
                            <input 
                                type="file" 
                                id="image-upload" 
                                hidden 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                            />
                            <button 
                                className={`btn ${uploading ? 'btn--ghost' : 'btn--secondary'} btn--sm`}
                                style={{ width: '100%' }}
                                disabled={uploading}
                                onClick={() => document.getElementById('image-upload').click()}
                            >
                                {uploading ? '⌛ Enviando...' : '📷 Alterar Foto'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Price Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-800)' }}>Preço Unitário (R$)</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--neutral-400)' }}>R$</span>
                        <input 
                            type="number" 
                            className="input"
                            style={{ paddingLeft: '2.5rem' }}
                            step="0.01"
                            defaultValue={editingProduct.pricing?.unitPrice}
                            onBlur={(e) => handleUpdateProduct(editingProduct.id, { 
                                pricing: { ...editingProduct.pricing, unitPrice: parseFloat(e.target.value) } 
                            })}
                        />
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--neutral-400)', marginTop: '6px' }}>Valor base para o cálculo de milheiro e descontos.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn btn--primary btn--full" onClick={() => setEditingProduct(null)}>Concluir e Fechar</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
