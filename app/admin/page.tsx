'use client';

import { PRODUCTS, ORDERS, USERS } from '@/lib/mockData';
import { Package, ShoppingBag, Users, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';

const totalRevenue = ORDERS.reduce((sum, o) => sum + o.total, 0);
const recentOrders = ORDERS.slice(-5).reverse();

export default function AdminDashboard() {
  const stats = [
    { label: 'สินค้าทั้งหมด', value: PRODUCTS.length, icon: <Package size={24} />, color: '#3B82F6', bg: '#EFF4FB', link: '/admin/products' },
    { label: 'คำสั่งซื้อ', value: ORDERS.length, icon: <ShoppingBag size={24} />, color: '#8B5CF6', bg: '#EDE9FE', link: '/admin/orders' },
    { label: 'ผู้ใช้ทั้งหมด', value: USERS.length, icon: <Users size={24} />, color: '#10B981', bg: '#ECFDF5', link: '/admin/users' },
    { label: 'รายได้รวม', value: `฿${totalRevenue.toLocaleString()}`, icon: <TrendingUp size={24} />, color: '#F59E0B', bg: '#FFFBEB', link: '/admin/orders' },
  ];

  const statusStyles: Record<string, string> = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    shipping: 'status-shipping',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled',
  };
  const statusLabels: Record<string, string> = {
    pending: 'รอดำเนินการ',
    confirmed: 'ยืนยันแล้ว',
    shipping: 'จัดส่งแล้ว',
    delivered: 'ส่งถึงแล้ว',
    cancelled: 'ยกเลิก',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem' }}>
          แดชบอร์ด
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>ภาพรวมร้าน Sivili Furniture</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.link} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.5rem', transition: 'transform 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E3A5F' }}>
                    {stat.value}
                  </p>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.75rem', fontSize: '0.8rem', color: '#9CA3AF' }}>
                <ArrowUpRight size={14} style={{ color: stat.color }} />
                <span>ดูรายละเอียด</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#1E3A5F' }}>คำสั่งซื้อล่าสุด</h2>
            <Link href="/admin/orders" style={{ fontSize: '0.8rem', color: '#3B82F6', textDecoration: 'none' }}>ดูทั้งหมด →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {recentOrders.map((order) => (
              <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#FAFAF8', borderRadius: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1E3A5F' }}>{order.id.toUpperCase()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.15rem' }}>
                    ฿{order.total.toLocaleString()} · {order.items.length} รายการ
                  </div>
                </div>
                <span className={`badge ${statusStyles[order.status]}`} style={{ fontSize: '0.75rem' }}>
                  {statusLabels[order.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#1E3A5F' }}>สินค้าขายดี</h2>
            <Link href="/admin/products" style={{ fontSize: '0.8rem', color: '#3B82F6', textDecoration: 'none' }}>ดูทั้งหมด →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {PRODUCTS.filter((p) => p.isFeatured).slice(0, 5).map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={p.images[0]} alt={p.nameTh} style={{ width: '44px', height: '44px', borderRadius: '0.4rem', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1E3A5F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.nameTh}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>⭐ {p.rating} · {p.reviewCount} รีวิว</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1E3A5F', flexShrink: 0 }}>
                  ฿{p.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
