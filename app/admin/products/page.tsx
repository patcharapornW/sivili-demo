'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([...PRODUCTS]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ nameTh: '', price: '', category: 'living', stock: '', brand: 'Sivili Home' });

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const catOk = !category || p.category === category;
    const searchOk = !search || p.nameTh.includes(q) || p.nameEn.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const handleDelete = (id: string) => {
    if (confirm('ยืนยันการลบสินค้านี้?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAdd = () => {
    if (!newProduct.nameTh || !newProduct.price) return;
    const p: Product = {
      id: `p_new_${Date.now()}`,
      name: newProduct.nameTh,
      nameEn: newProduct.nameTh,
      nameTh: newProduct.nameTh,
      nameZh: newProduct.nameTh,
      nameJa: newProduct.nameTh,
      nameLa: newProduct.nameTh,
      category: newProduct.category,
      price: Number(newProduct.price),
      material: '-',
      dimensions: '-',
      brand: newProduct.brand,
      colors: ['#FFFFFF'],
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'],
      description: '',
      descriptionTh: '',
      stock: Number(newProduct.stock) || 0,
      rating: 5,
      reviewCount: 0,
      isFeatured: false,
      isNew: true,
    };
    setProducts((prev) => [p, ...prev]);
    setShowAdd(false);
    setNewProduct({ nameTh: '', price: '', category: 'living', stock: '', brand: 'Sivili Home' });
  };

  const catLabel: Record<string, string> = {
    living: 'ห้องนั่งเล่น', bedroom: 'ห้องนอน',
    dining: 'ห้องทานข้าว', office: 'ห้องทำงาน', outdoor: 'กลางแจ้ง',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem' }}>จัดการสินค้า</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>{filtered.length} รายการ</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> เพิ่มสินค้า
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input className="input" style={{ paddingLeft: '2.25rem' }} placeholder="ค้นหาสินค้า..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="select" style={{ minWidth: '160px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">ทุกหมวดหมู่</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{catLabel[c.id]}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>สินค้า</th>
              <th>หมวดหมู่</th>
              <th>ราคา</th>
              <th>สต็อก</th>
              <th>คะแนน</th>
              <th>สถานะ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.images[0]} alt={p.nameTh} style={{ width: '44px', height: '44px', borderRadius: '0.4rem', objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#1E3A5F', fontSize: '0.875rem' }}>{p.nameTh}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-navy" style={{ fontSize: '0.75rem' }}>{catLabel[p.category]}</span></td>
                <td style={{ fontWeight: 600 }}>฿{p.price.toLocaleString()}</td>
                <td>
                  <span style={{ color: p.stock <= 5 ? '#DC2626' : p.stock <= 10 ? '#F59E0B' : '#16A34A', fontWeight: 600 }}>
                    {p.stock}
                  </span>
                </td>
                <td>⭐ {p.rating}</td>
                <td>
                  {p.isNew && <span className="badge badge-new" style={{ fontSize: '0.7rem' }}>NEW</span>}
                  {p.isFeatured && <span className="badge badge-gold" style={{ fontSize: '0.7rem', marginLeft: '0.25rem' }}>⭐ แนะนำ</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setEditItem(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3B82F6', padding: '0.25rem' }}>
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '0.25rem' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <>
          <div className="overlay" onClick={() => setShowAdd(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, background: 'white', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(30,58,95,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1E3A5F' }}>เพิ่มสินค้าใหม่</h3>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label className="form-label">ชื่อสินค้า (ไทย) *</label>
                <input className="input" value={newProduct.nameTh} onChange={(e) => setNewProduct({ ...newProduct, nameTh: e.target.value })} placeholder="ชื่อสินค้าภาษาไทย" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label className="form-label">ราคา *</label>
                  <input type="number" className="input" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="฿" /></div>
                <div><label className="form-label">สต็อก</label>
                  <input type="number" className="input" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} /></div>
              </div>
              <div><label className="form-label">หมวดหมู่</label>
                <select className="select" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{catLabel[c.id]}</option>)}
                </select></div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={() => setShowAdd(false)} className="btn-secondary" style={{ flex: 1 }}>ยกเลิก</button>
              <button onClick={handleAdd} className="btn-primary" style={{ flex: 1 }}><Check size={16} /> บันทึก</button>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editItem && (
        <>
          <div className="overlay" onClick={() => setEditItem(null)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, background: 'white', borderRadius: '1rem', padding: '2rem', width: '90%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(30,58,95,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1E3A5F' }}>แก้ไขสินค้า</h3>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label className="form-label">ชื่อสินค้า (ไทย)</label>
                <input className="input" value={editItem.nameTh} onChange={(e) => setEditItem({ ...editItem, nameTh: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label className="form-label">ราคา</label>
                  <input type="number" className="input" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })} /></div>
                <div><label className="form-label">สต็อก</label>
                  <input type="number" className="input" value={editItem.stock} onChange={(e) => setEditItem({ ...editItem, stock: Number(e.target.value) })} /></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={() => setEditItem(null)} className="btn-secondary" style={{ flex: 1 }}>ยกเลิก</button>
              <button
                onClick={() => {
                  setProducts((prev) => prev.map((p) => p.id === editItem.id ? editItem : p));
                  setEditItem(null);
                }}
                className="btn-primary" style={{ flex: 1 }}
              >
                <Check size={16} /> บันทึก
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
