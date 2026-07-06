'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../LanguageProvider';
import ProductCard from '../ProductCard';
import { PRODUCTS } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { ChevronRight } from 'lucide-react';

export default function FeaturedSection({ data }: { data?: any }) {
  const { t } = useLanguage();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    setFeatured(PRODUCTS.filter((p) => p.isFeatured).slice(0, 8));
  }, []);

  return (
    <section className="section" style={{ background: '#FAFAF8' }}>
      <div className="sivili-container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">{t('featured_title')}</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>{t('featured_subtitle')}</p>
          </div>
          <Link href="/catalog?featured=true" className="btn-ghost flex items-center gap-1 hidden sm:flex">
            {t('view_all')} <ChevronRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href="/catalog?featured=true" className="btn-secondary">
            {t('view_all')} <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
