'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../components/LanguageProvider';
import { useWishlist } from '../components/WishlistProvider';
import { PRODUCTS } from '@/lib/mockData';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { t } = useLanguage();
  const { ids } = useWishlist();
  const wishlistProducts = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <>
      <Navbar />
      <main className="page-top" style={{ minHeight: '70vh' }}>
        <div style={{ background: '#EFF4FB', borderBottom: '1px solid #D6E4F5', padding: '1.5rem 0' }}>
          <div className="sivili-container">
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E3A5F', margin: 0 }}>
              <Heart size={22} style={{ display: 'inline', marginRight: '0.5rem', color: '#1E3A5F', verticalAlign: 'middle' }} />
              {t('wishlist_title')}
            </h1>
            <p style={{ color: '#5B6B7A', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              {wishlistProducts.length} {t('items')}
            </p>
          </div>
        </div>

        <div className="sivili-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <Heart size={64} style={{ color: '#D6E4F5', margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5rem' }}>
                {t('wishlist_empty')}
              </h2>
              <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>{t('wishlist_empty_sub')}</p>
              <Link href="/catalog" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                {t('nav_catalog')}
              </Link>
            </div>
          ) : (
            <div className="product-grid">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
