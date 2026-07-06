'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import { useEffect } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, Users, LogOut, ArrowLeft, ExternalLink, Palette
} from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'แดชบอร์ด', icon: <LayoutDashboard size={18} /> },
  { href: '/admin/products', label: 'จัดการสินค้า', icon: <Package size={18} /> },
  { href: '/admin/orders', label: 'จัดการคำสั่งซื้อ', icon: <ShoppingBag size={18} /> },
  { href: '/admin/users', label: 'จัดการผู้ใช้', icon: <Users size={18} /> },
  { href: '/admin/theme', label: 'จัดการธีม', icon: <Palette size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || !isAdmin) {
      router.replace('/login');
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#9CA3AF' }}>กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF8' }}>
      {/* Admin Sidebar */}
      <aside className="admin-sidebar hidden md:flex flex-col">
        {/* Brand */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
            Sivili Admin
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>
            ระบบจัดการร้านค้า
          </div>
        </div>

        {/* User Info */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212,169,106,0.2)', border: '2px solid #D4A96A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#D4A96A', flexShrink: 0 }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>แอดมิน</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: '0.75rem' }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/" className="admin-nav-link">
            <ExternalLink size={18} />
            ดูหน้าร้าน
          </Link>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="admin-nav-link w-full"
            style={{ color: '#FCA5A5' }}
          >
            <LogOut size={18} />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#1E3A5F] text-white p-3 flex items-center justify-between shadow-lg">
        <div style={{ fontWeight: 700 }}>Sivili Admin</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {NAV.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ padding: '0.4rem', borderRadius: '0.375rem', background: pathname === item.href ? 'rgba(255,255,255,0.15)' : 'transparent', color: 'white' }}
            >
              {item.icon}
            </Link>
          ))}
          <Link href="/" style={{ padding: '0.4rem', color: 'rgba(255,255,255,0.7)' }}>
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto', paddingTop: 'env(safe-area-inset-top)' }} className="md:p-0 pt-14">
        {children}
      </main>
    </div>
  );
}
