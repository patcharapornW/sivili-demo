'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';
import { useWishlist } from './WishlistProvider';
import type { Product } from '@/lib/mockData';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { t, locale } = useLanguage();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWished = has(product.id);

  // Locale name map
  const nameMap: Record<string, string> = {
    th: product.nameTh,
    en: product.nameEn,
    zh: product.nameZh,
    ja: product.nameJa,
    la: product.nameLa,
  };
  const displayName = nameMap[locale] || product.nameEn;

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.nameEn,
      nameTh: product.nameTh,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      stock: product.stock,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <article className="card group cursor-pointer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Image Container */}
        <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', background: '#F5F0E8' }}>
          <img
            src={product.images[0]}
            alt={displayName}
            className="product-img"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {product.isNew && (
              <span className="badge badge-new">NEW</span>
            )}
            {discountPct > 0 && (
              <span className="badge" style={{ background: '#DC2626', color: 'white' }}>
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: isWished ? '#1E3A5F' : 'rgba(255,255,255,0.9)',
              color: isWished ? 'white' : '#1E3A5F',
              border: 'none',
              cursor: 'pointer',
              opacity: 0,
              transform: 'scale(0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.opacity = '1';
              el.style.transform = 'scale(1)';
            }}
            aria-label="Toggle wishlist"
          >
            <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
          </button>

          {/* Hover overlay with add-to-cart */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0.75rem',
              background: 'linear-gradient(transparent, rgba(30,58,95,0.9))',
              transform: 'translateY(100%)',
              transition: 'transform 0.25s ease',
            }}
            className="group-hover:!translate-y-0"
          >
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: product.stock === 0 ? '#9CA3AF' : 'white',
                color: '#1E3A5F',
                border: 'none',
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <ShoppingCart size={15} />
              {product.stock === 0 ? t('out_of_stock') : t('add_to_cart')}
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '0.875rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {/* Category */}
          <div style={{ fontSize: '0.75rem', color: '#7AABD9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brand}
          </div>

          {/* Name */}
          <h3 style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#1E3A5F',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            margin: 0,
            fontFamily: 'Kanit, sans-serif',
          }}>
            {displayName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1" style={{ fontSize: '0.8125rem' }}>
            <div className="stars" style={{ fontSize: '0.8rem' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  fill={s <= Math.round(product.rating) ? '#F59E0B' : 'none'}
                  stroke="#F59E0B"
                />
              ))}
            </div>
            <span style={{ color: '#9CA3AF' }}>({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div style={{ marginTop: 'auto', paddingTop: '0.4rem' }} className="flex items-baseline gap-2">
            <span className="price-tag">{t('baht')}{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="price-original">{t('baht')}{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
