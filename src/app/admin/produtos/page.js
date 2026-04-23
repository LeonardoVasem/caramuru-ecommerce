'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc, addDoc, collection, onSnapshot, query } from 'firebase/firestore';
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

  const handleAddProduct = async () => {
    const name = prompt('Nome do produto:');
    if (!name || !name.trim()) return;

    const slug = name.trim().toLowerCase()
      .replace(/[àáâã]/g, 'a').replace(/[éêë]/g, 'e')
      .replace(/[íî]/g, 'i').replace(/[óôõ]/g, 'o')
      .replace(/[úû]/g, 'u').replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: name.trim(),
        slug,
        shortDescription: '',
        description: '',
        status: 'active',
        featured: false,
        featuredImage: '',
        parentCategoryId: 'sacolas',
        categoryId: 'sacolas-kraft',
        tags: [],
        specifications: {},
        pricing: {
          unitPrice: 0,
          unit: 'un',
          bulkPrices: [
            { label: '1.000 un', minQty: 1000, price: 0 },
          ],
        },
        reviewCount: 0,
        salesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Open the edit modal right away
      setEditingProduct({
        id: docRef.id,
        name: name.trim(),
        slug,
        status: 'active',
        featuredImage: '',
        pricing: { unitPrice: 0, unit: 'un', bulkPrices: [] },
        parentCategoryId: 'sacolas',
        categoryId: 'sacolas-kraft',
      });
    } catch (error) {
      alert('Erro ao criar produto: ' + error.message);
    }
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, { ...data, updatedAt: new Date() });
      if (!uploading) setEditingProduct(null);
    } catch (error) {
      alert('Erro ao atualizar produto: ' + error.message);
    }
  };

  // Save individual fields without closing the modal
  const handleUpdateField = async (data) => {
    if (!editingProduct) return;
    try {
      const docRef = doc(db, 'products', editingProduct.id);
      await updateDoc(docRef, { ...data, updatedAt: new Date() });
      setEditingProduct({ ...editingProduct, ...data });
    } catch (error) {
      console.error('Erro ao salvar campo:', error);
    }
  };

  const handleImageUpload = async (file) => {
    if (!editingProduct || !file) return;
    
    setUploading(true);
    try {
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
          Produtos ({filtered.length})
        </h1>
        <button className="btn btn--primary" onClick={handleAddProduct}>
          + Novo Produto
        </button>
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

      {/* Edit Modal — Full Product Manager */}
      {editingProduct && (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, 
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', 
            padding: '20px', overflowY: 'auto',
        }}>
            <div className="page-enter" style={{
                background: 'white', borderRadius: '20px', 
                width: '100%', maxWidth: '560px', padding: '2rem',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)', margin: '20px 0',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: 0 }}>Gerenciar Produto</h2>
                    <button onClick={() => setEditingProduct(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--neutral-400)' }}>×</button>
                </div>

                {/* Image */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--neutral-150)' }}>
                    <label style={labelStyle}>Foto do Produto</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '12px', background: 'white', overflow: 'hidden', position: 'relative', border: '1px solid var(--neutral-200)', flexShrink: 0 }}>
                            {editingProduct.featuredImage ? (
                                <Image src={editingProduct.featuredImage} alt="" fill style={{ objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2rem' }}>📦</div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <input type="file" id="image-upload" hidden accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
                            <button 
                                className={`btn ${uploading ? 'btn--ghost' : 'btn--outline'} btn--sm`}
                                style={{ width: '100%' }} disabled={uploading}
                                onClick={() => document.getElementById('image-upload').click()}
                            >
                                {uploading ? '⌛ Enviando...' : '📷 Alterar Foto'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Name */}
                <div style={fieldStyle}>
                    <label style={labelStyle}>Nome do Produto</label>
                    <input className="input" defaultValue={editingProduct.name}
                        onBlur={(e) => handleUpdateField({ name: e.target.value })} />
                </div>

                {/* Description */}
                <div style={fieldStyle}>
                    <label style={labelStyle}>Descrição</label>
                    <textarea className="input" rows={3} style={{ resize: 'vertical', minHeight: '70px' }}
                        defaultValue={editingProduct.description || editingProduct.shortDescription || ''}
                        onBlur={(e) => handleUpdateField({ description: e.target.value, shortDescription: e.target.value })}
                        placeholder="Descreva o produto..."
                    />
                </div>

                {/* Category */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Categoria</label>
                        <select className="input" defaultValue={editingProduct.parentCategoryId || ''}
                            onChange={(e) => handleUpdateField({ parentCategoryId: e.target.value })}>
                            <option value="sacolas">🛍️ Sacolas</option>
                            <option value="caixas">📦 Caixas</option>
                            <option value="sacos-ecommerce">📮 Sacos E-commerce</option>
                            <option value="fitas">🎀 Fitas</option>
                            <option value="complementos">✨ Complementos</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Subcategoria</label>
                        <input className="input" defaultValue={editingProduct.categoryId || ''}
                            onBlur={(e) => handleUpdateField({ categoryId: e.target.value })}
                            placeholder="ex: sacolas-kraft" />
                    </div>
                </div>

                {/* Status + Featured */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Status</label>
                        <select className="input" defaultValue={editingProduct.status || 'active'}
                            onChange={(e) => handleUpdateField({ status: e.target.value })}>
                            <option value="active">✅ Ativo</option>
                            <option value="inactive">⛔ Inativo</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Destaque?</label>
                        <select className="input" defaultValue={editingProduct.featured ? 'true' : 'false'}
                            onChange={(e) => handleUpdateField({ featured: e.target.value === 'true' })}>
                            <option value="false">Não</option>
                            <option value="true">⭐ Sim — aparece na home</option>
                        </select>
                    </div>
                </div>

                {/* Pricing */}
                <div style={fieldStyle}>
                    <label style={labelStyle}>Preço Unitário (R$)</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--neutral-400)', fontSize: '13px' }}>R$</span>
                        <input type="number" className="input" style={{ paddingLeft: '2.5rem' }}
                            step="0.01" defaultValue={editingProduct.pricing?.unitPrice}
                            onBlur={(e) => handleUpdateField({ 
                                pricing: { ...editingProduct.pricing, unitPrice: parseFloat(e.target.value) || 0 } 
                            })} />
                    </div>
                </div>

                {/* Specifications */}
                <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--neutral-150)' }}>
                    <label style={labelStyle}>Especificações Técnicas</label>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {[
                          { key: 'material', label: 'Material', placeholder: 'ex: Papel Kraft 90g' },
                          { key: 'largura', label: 'Largura (cm)', placeholder: 'ex: 30' },
                          { key: 'altura', label: 'Altura (cm)', placeholder: 'ex: 40' },
                          { key: 'fundo', label: 'Fundo (cm)', placeholder: 'ex: 12' },
                          { key: 'cor', label: 'Cor', placeholder: 'ex: Branco' },
                          { key: 'gramatura', label: 'Gramatura', placeholder: 'ex: 90g/m²' },
                        ].map((spec) => (
                            <div key={spec.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--neutral-600)', minWidth: '80px' }}>{spec.label}</span>
                                <input className="input" style={{ flex: 1, padding: '6px 10px', fontSize: '13px' }}
                                    defaultValue={editingProduct.specifications?.[spec.key] || ''}
                                    placeholder={spec.placeholder}
                                    onBlur={(e) => handleUpdateField({
                                        specifications: { ...(editingProduct.specifications || {}), [spec.key]: e.target.value }
                                    })} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                    <button className="btn btn--primary btn--full" onClick={() => setEditingProduct(null)}>Concluir e Fechar</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--neutral-700)', textTransform: 'uppercase', letterSpacing: '0.03em' };
const fieldStyle = { marginBottom: '1rem' };
