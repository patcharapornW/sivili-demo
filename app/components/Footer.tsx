'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { MapPin, Phone, Mail, Share2, Camera, PlayCircle } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: '#1E3A5F', color: 'rgba(255,255,255,0.85)' }}>
      {/* Top Strip */}
      <div style={{ background: '#162B46', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="sivili-container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            {[
              { icon: '🚚', title: t('free_shipping'), sub: 'ทั่วราชอาณาจักร' },
              { icon: '🔒', title: t('secure_payment'), sub: 'ระบบชำระเงินปลอดภัย' },
              { icon: '⭐', title: t('quality_guarantee'), sub: 'รับประกันสินค้า 1 ปี' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 justify-center sm:justify-start">
                <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="sivili-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#D4A96A', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'serif' }}>S</span>
              </div>
              <div style={{ fontFamily: 'Noto Serif Thai, serif', fontWeight: 700, fontSize: '1.3rem', color: 'white' }}>
                Sivili
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
              {t('footer_desc')}
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <Share2 size={18} />, label: 'Facebook' },
                { icon: <Camera size={18} />, label: 'Instagram' },
                { icon: <PlayCircle size={18} />, label: 'YouTube' },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#D4A96A';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>
              สินค้า
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/catalog?cat=living', label: 'ห้องนั่งเล่น' },
                { href: '/catalog?cat=bedroom', label: 'ห้องนอน' },
                { href: '/catalog?cat=dining', label: 'ห้องทานข้าว' },
                { href: '/catalog?cat=office', label: 'ห้องทำงาน' },
                { href: '/catalog?cat=outdoor', label: 'กลางแจ้ง' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A96A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>
              บัญชีผู้ใช้
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/login', label: t('nav_login') },
                { href: '/register', label: t('nav_register') },
                { href: '/wishlist', label: t('nav_wishlist') },
                { href: '/cart', label: t('nav_cart') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4A96A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>
              {t('footer_contact')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <MapPin size={16} />, text: '123 ถนนสีลม กรุงเทพฯ 10500' },
                { icon: <Phone size={16} />, text: '02-xxx-xxxx' },
                { icon: <Mail size={16} />, text: 'hello@sivili.com' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  <span style={{ color: '#D4A96A', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="sivili-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            {t('footer_rights')}
          </p>
          <div className="flex gap-4" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            <span>นโยบายความเป็นส่วนตัว</span>
            <span>·</span>
            <span>เงื่อนไขการใช้บริการ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
