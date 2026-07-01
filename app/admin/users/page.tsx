'use client';

import { useState } from 'react';
import { USERS } from '@/lib/mockData';
import type { User } from '@/lib/mockData';
import { Search, Shield, User as UserIcon } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState<Omit<User, 'password'>[]>(
    USERS.map(({ password: _, ...u }) => u)
  );
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !search || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const toggleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === 'admin' ? 'customer' : 'admin' } : u
      )
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem' }}>จัดการผู้ใช้</h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>{filtered.length} บัญชี</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6" style={{ maxWidth: '300px' }}>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F' }}>
            {users.filter((u) => u.role === 'admin').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>แอดมิน</div>
        </div>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F' }}>
            {users.filter((u) => u.role === 'customer').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>ลูกค้า</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '1.25rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input className="input" style={{ paddingLeft: '2.25rem' }} placeholder="ค้นหาชื่อหรืออีเมล..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>ผู้ใช้</th>
              <th>อีเมล</th>
              <th>บทบาท</th>
              <th>สมัครเมื่อ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: user.role === 'admin' ? '#1E3A5F' : '#EFF4FB',
                      color: user.role === 'admin' ? 'white' : '#1E3A5F',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.875rem',
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1E3A5F' }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.875rem', color: '#5B6B7A' }}>{user.email}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      background: user.role === 'admin' ? '#1E3A5F' : '#EFF4FB',
                      color: user.role === 'admin' ? 'white' : '#1E3A5F',
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    }}
                  >
                    {user.role === 'admin' ? <Shield size={12} /> : <UserIcon size={12} />}
                    {user.role === 'admin' ? 'แอดมิน' : 'ลูกค้า'}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                  {new Date(user.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                </td>
                <td>
                  <button
                    onClick={() => toggleRole(user.id)}
                    className="btn-ghost"
                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', border: '1px solid #EDE5D8' }}
                  >
                    {user.role === 'admin' ? 'ลดสิทธิ์' : 'เพิ่มสิทธิ์'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>ไม่พบผู้ใช้</div>
        )}
      </div>
    </div>
  );
}
