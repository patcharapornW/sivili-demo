'use client';

import { useLanguage } from '../LanguageProvider';
import { Truck, Award, TrendingUp, Headphones } from 'lucide-react';

export default function TrustBadgesSection({ data }: { data?: any }) {
  const { t } = useLanguage();
  return (
    <section style={{ background: '#EFF4FB', borderBottom: '1px solid #D6E4F5' }}>
      <div className="sivili-container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={22} />, text: t('free_shipping') },
            { icon: <Award size={22} />, text: t('quality_guarantee') },
            { icon: <TrendingUp size={22} />, text: 'ราคาดีที่สุด' },
            { icon: <Headphones size={22} />, text: 'บริการลูกค้า 24/7' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <div style={{ color: '#1E3A5F', flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1E3A5F' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
