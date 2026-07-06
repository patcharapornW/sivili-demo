'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useLanguage } from '../../components/LanguageProvider';
import { useCart } from '../../components/CartProvider';
import { useWishlist } from '../../components/WishlistProvider';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Check } from 'lucide-react';

export default function ProductDetailPage({ params }: PageProps<'/products/[id]'>) {
  const { t, locale } = useLanguage();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const p = PRODUCTS.find((prod) => prod.id === id);
      if (!p) return notFound();
      setProduct(p);
      setRelated(PRODUCTS.filter((r) => r.category === p.category && r.id !== p.id).slice(0, 4));
    };
    load();
  }, [params]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="page-top" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '100%', height: '400px' }} />
        </main>
        <Footer />
      </>
    );
  }

  const isWished = has(product.id);
  const nameMap: Record<string, string> = {
    th: product.nameTh, en: product.nameEn, zh: product.nameZh, ja: product.nameJa, la: product.nameLa,
  };
  const displayName = nameMap[locale] || product.nameEn;
  const catName = CATEGORIES.find((c) => c.id === product.category);

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.nameEn,
      nameTh: product.nameTh,
      price: product.price,
      quantity: qty,
      image: product.images[0],
      stock: product.stock,
    });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  return (
    <>
      <Navbar />
      <main className="page-top">
        {/* Breadcrumb */}
        <div style={{ background: '#F5F0E8', borderBottom: '1px solid #EDE5D8', padding: '0.75rem 0' }}>
          <div className="sivili-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#9CA3AF' }}>
            <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>หน้าหลัก</Link>
            <span>/</span>
            <Link href="/catalog" style={{ color: '#9CA3AF', textDecoration: 'none' }}>{t('nav_catalog')}</Link>
            <span>/</span>
            {catName && (
              <>
                <Link href={`/catalog?category=${catName.id}`} style={{ color: '#9CA3AF', textDecoration: 'none' }}>{t(catName.nameKey)}</Link>
                <span>/</span>
              </>
            )}
            <span style={{ color: '#1E3A5F', fontWeight: 500 }}>{displayName}</span>
          </div>
        </div>

        <div className="sivili-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          {/* Back */}
          <Link href="/catalog" className="btn-ghost flex items-center gap-1 mb-6 w-fit" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={18} /> {t('back')}
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div style={{ flex: '0 0 auto', width: '100%', maxWidth: '520px' }}>
              {/* Main Image */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  background: '#F5F0E8',
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src={product.images[activeImg]}
                  alt={displayName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
                />
                {discountPct > 0 && (
                  <span className="badge absolute top-4 left-4" style={{ background: '#DC2626', color: 'white', fontSize: '0.875rem' }}>
                    -{discountPct}%
                  </span>
                )}
                {product.isNew && (
                  <span className="badge badge-new absolute top-4" style={{ left: discountPct > 0 ? '5rem' : '1rem', fontSize: '0.875rem' }}>
                    NEW
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="thumb-strip mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={activeImg === i ? 'active' : ''}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div style={{ flex: 1 }}>
              {/* Brand + Category */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span className="badge badge-navy">{product.brand}</span>
                {catName && (
                  <span className="badge badge-gold">{catName.icon} {t(catName.nameKey)}</span>
                )}
              </div>

              <h1 style={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: 'clamp(1.4rem, 3vw, 1.875rem)',
                fontWeight: 700,
                color: '#1E3A5F',
                marginBottom: '0.75rem',
                lineHeight: 1.3,
              }}>
                {displayName}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill={s <= Math.round(product.rating) ? '#F59E0B' : 'none'} stroke="#F59E0B" />
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: '#1E3A5F' }}>{product.rating}</span>
                <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>({product.reviewCount} {t('reviews')})</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#1E3A5F' }}>
                  ฿{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="price-original" style={{ fontSize: '1.1rem' }}>
                      ฿{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="badge" style={{ background: '#DC2626', color: 'white' }}>
                      ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">{t('color')}</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        style={{
                          width: '32px', height: '32px', borderRadius: '50%', background: color,
                          border: selectedColor === i ? '3px solid #1E3A5F' : '3px solid #EDE5D8',
                          cursor: 'pointer', outline: selectedColor === i ? '2px solid #7AABD9' : 'none',
                          outlineOffset: '2px',
                        }}
                        aria-label={`Color ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">{t('qty')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <div className="qty-stepper">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease"><Minus size={14} /></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))} aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                    {product.stock > 0 ? (
                      <span style={{ color: '#065F46' }}>✓ {t('in_stock')} ({product.stock})</span>
                    ) : (
                      <span style={{ color: '#DC2626' }}>✗ {t('out_of_stock')}</span>
                    )}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '160px', justifyContent: 'center', fontSize: '1rem', padding: '0.75rem' }}
                >
                  {addedMsg ? (
                    <><Check size={18} /> เพิ่มแล้ว!</>
                  ) : (
                    <><ShoppingCart size={18} /> {t('add_to_cart')}</>
                  )}
                </button>
                <button
                  onClick={() => toggle(product.id)}
                  className={isWished ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.75rem 1.25rem' }}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={18} fill={isWished ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Success message */}
              {addedMsg && (
                <div className="alert alert-success fade-in mb-4">
                  <Check size={18} />
                  เพิ่มสินค้าลงในตะกร้าแล้ว!
                </div>
              )}

              {/* Product Details */}
              <div className="divider" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1.5rem' }}>
                {[
                  { label: t('sku'), value: product.id.toUpperCase() },
                  { label: t('brand'), value: product.brand },
                  { label: t('material'), value: product.material },
                  { label: t('dimensions'), value: product.dimensions },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#1E3A5F', fontWeight: 500, marginTop: '0.2rem' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="divider" />
              <h3 style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: '0.75rem', fontSize: '1rem' }}>{t('description')}</h3>
              <p style={{ color: '#5B6B7A', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                {locale === 'th' ? product.descriptionTh : product.description}
              </p>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section style={{ marginTop: '4rem' }}>
              <div className="divider" />
              <h2 className="section-title mb-6">สินค้าที่เกี่ยวข้อง</h2>
              <div className="product-grid">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
