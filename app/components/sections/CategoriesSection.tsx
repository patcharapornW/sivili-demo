'use client';

import Link from 'next/link';
import { useLanguage } from '../LanguageProvider';
import { CATEGORIES, PRODUCTS } from '@/lib/mockData';

export default function CategoriesSection({ data }: { data?: any }) {
  const { t } = useLanguage();
  return (
    <section className="section">
      <div className="sivili-container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">{t('shop_by_category')}</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>เลือกเฟอร์นิเจอร์ตามห้องที่คุณต้องการ</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
            const previewImg = catProducts[0]?.images[0];
            return (
              <Link key={cat.id} href={`/catalog?category=${cat.id}`} style={{ textDecoration: 'none' }}>
                <div
                  className="card group cursor-pointer text-center overflow-hidden"
                  style={{ position: 'relative' }}
                >
                  <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: '#F5F0E8' }}>
                    {previewImg && (
                      <img
                        src={previewImg}
                        alt={cat.nameKey}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        className="group-hover:scale-110"
                      />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(30,58,95,0.7))' }} />
                    <div style={{ position: 'absolute', bottom: '0.5rem', left: 0, right: 0, textAlign: 'center' }}>
                      <div style={{ fontSize: '1.75rem' }}>{cat.icon}</div>
                    </div>
                  </div>
                  <div style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E3A5F' }}>{t(cat.nameKey)}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>{catProducts.length} รายการ</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
