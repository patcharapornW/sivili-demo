'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../LanguageProvider';
import ProductCard from '../ProductCard';
import { PRODUCTS } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { ChevronRight } from 'lucide-react';

export default function NewArrivalsSection({ data }: { data?: any }) {
  const { t } = useLanguage();
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    setNewArrivals(PRODUCTS.filter((p) => p.isNew).slice(0, 4));
  }, []);

  if (newArrivals.length === 0) return null;

  return (
    <section className="section">
      <div className="sivili-container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">{t('new_arrivals')}</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>สินค้ามาใหม่ ล่าสุดในร้าน</p>
          </div>
          <Link href="/catalog?sort=newest" className="btn-ghost flex items-center gap-1 hidden sm:flex">
            {t('view_all')} <ChevronRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
