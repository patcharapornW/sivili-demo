'use client';

import { useState } from 'react';
import { ORDERS } from '@/lib/mockData';
import type { Order } from '@/lib/mockData';
import { Search } from 'lucide-react';

type StatusKey = Order['status'];

const statusLabels: Record<StatusKey, string> = {
  pending: 'รอดำเนินการ',
  confirmed: 'ยืนยันแล้ว',
  shipping: 'กำลังจัดส่ง',
  delivered: 'ส่งถึงแล้ว',
  cancelled: 'ยกเลิก',
};
const statusClass: Record<StatusKey, string> = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  shipping: 'status-shipping',
  delivered: 'status-delivered',
  cancelled: 'status-cancelled',
};
const paymentLabels: Record<string, string> = {
  credit_card: '💳 บัตรเครดิต',
  qr_code: '📱 QR Code',
  mobile_banking: '🏦 Mobile Banking',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([...ORDERS].reverse());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = !search || o.id.toLowerCase().includes(q);
    const matchStatus = !statusFilter || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: StatusKey) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem' }}>จัดการคำสั่งซื้อ</h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>{filtered.length} รายการ</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {(Object.keys(statusLabels) as StatusKey[]).map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
              className="card"
              style={{ padding: '0.75rem', textAlign: 'center', cursor: 'pointer', border: statusFilter === s ? '2px solid #1E3A5F' : '2px solid transparent' }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F' }}>{count}</div>
              <span className={`badge ${statusClass[s]}`} style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>{statusLabels[s]}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input className="input" style={{ paddingLeft: '2.25rem' }} placeholder="ค้นหาเลขที่คำสั่งซื้อ..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="select" style={{ minWidth: '160px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">ทุกสถานะ</option>
          {(Object.keys(statusLabels) as StatusKey[]).map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>เลขที่คำสั่งซื้อ</th>
              <th>วันที่</th>
              <th>รายการ</th>
              <th>ยอดรวม</th>
              <th>ชำระผ่าน</th>
              <th>สถานะ</th>
              <th>เปลี่ยนสถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700, color: '#1E3A5F', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {order.id.toUpperCase()}
                </td>
                <td style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                  {new Date(order.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                </td>
                <td style={{ fontSize: '0.875rem' }}>{order.items.length} รายการ</td>
                <td style={{ fontWeight: 700, color: '#1E3A5F' }}>฿{order.total.toLocaleString()}</td>
                <td style={{ fontSize: '0.8rem' }}>{paymentLabels[order.paymentMethod] || order.paymentMethod}</td>
                <td>
                  <span className={`badge ${statusClass[order.status]}`} style={{ fontSize: '0.75rem' }}>
                    {statusLabels[order.status]}
                  </span>
                </td>
                <td>
                  <select
                    className="select"
                    style={{ padding: '0.25rem 1.5rem 0.25rem 0.5rem', fontSize: '0.8rem', minWidth: '120px' }}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as StatusKey)}
                  >
                    {(Object.keys(statusLabels) as StatusKey[]).map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>ไม่พบคำสั่งซื้อ</div>
        )}
      </div>
    </div>
  );
}
