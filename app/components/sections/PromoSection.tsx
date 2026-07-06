'use client';

import Link from 'next/link';
import { useLanguage } from '../LanguageProvider';
import { ArrowRight } from 'lucide-react';

interface PromoSectionProps {
  data?: any;
}

export default function PromoSection({ data }: PromoSectionProps) {
  const { t } = useLanguage();
  
  const badge = data?.badge || '🎉 โปรโมชั่นพิเศษ';
  const title = data?.title || 'จัดส่งฟรีทั่วประเทศ\nเมื่อซื้อครบ ฿5,000';
  const subtitle = data?.subtitle || 'ใช้โค้ด SIVILI2026 รับส่วนลดเพิ่มอีก 10% สำหรับสมาชิกใหม่';
  const buttonText = data?.buttonText || t('shop_now');

  return (
    <section style={{ position: 'relative', overflow: 'hidden', margin: '0' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary, #1E3A5F) 0%, #2B5EA7 100%)',
          padding: 'clamp(2.5rem, 6vw, 4rem) 0',
        }}
      >
        <div className="sivili-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(212,169,106,0.15)', border: '1px solid rgba(212,169,106,0.4)', color: 'var(--color-primary, #D4A96A)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.875rem', borderRadius: '999px' }}>
            {badge}
          </div>
          <h2 style={{ color: 'white', fontFamily: 'Kanit, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, margin: 0, whiteSpace: 'pre-line' }}>
            {title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '400px', margin: 0 }}>
            {subtitle}
          </p>
          <Link href="/catalog" className="btn-primary" style={{ background: 'var(--color-primary, #D4A96A)', borderColor: 'var(--color-primary, #D4A96A)', fontSize: '1rem', padding: '0.75rem 2rem' }}>
            {buttonText} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
