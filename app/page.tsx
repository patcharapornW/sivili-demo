'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { useLanguage } from './components/LanguageProvider';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { ArrowRight, ChevronRight, TrendingUp, Award, Truck, Headphones } from 'lucide-react';

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90',
      title: t('hero_title'),
      subtitle: t('hero_subtitle'),
    },
    {
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=90',
      title: locale === 'th' ? 'ห้องนอนสุดหรู\nสำหรับการพักผ่อนที่สมบูรณ์แบบ' : 'Luxury Bedrooms\nFor Perfect Rest',
      subtitle: locale === 'th' ? 'เตียงและเฟอร์นิเจอร์ห้องนอนคุณภาพพรีเมียม' : 'Premium bedroom furniture for your best sleep',
    },
    {
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=1600&q=90',
      title: locale === 'th' ? 'โต๊ะอาหารสวยงาม\nสำหรับมื้ออาหารแห่งความทรงจำ' : 'Beautiful Dining\nFor Memorable Meals',
      subtitle: locale === 'th' ? 'ชุดโต๊ะทานข้าวดีไซน์ทันสมัย เหมาะทุกสไตล์บ้าน' : 'Modern dining sets for every home style',
    },
  ];

  useEffect(() => {
    setFeatured(PRODUCTS.filter((p) => p.isFeatured).slice(0, 8));
    setNewArrivals(PRODUCTS.filter((p) => p.isNew).slice(0, 4));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[heroIndex];
  const catNames: Record<string, string> = {
    th: 'nameTh', en: 'nameEn', zh: 'nameZh', ja: 'nameJa', la: 'nameLa',
  };

  return (
    <>
      <Navbar />
      <main className="page-top">

        {/* ===== HERO SECTION ===== */}
        <section style={{ position: 'relative', height: 'clamp(480px, 80vh, 700px)', overflow: 'hidden' }}>
          {/* Slides */}
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === heroIndex ? 1 : 0,
                transition: 'opacity 1.2s ease',
                zIndex: i === heroIndex ? 1 : 0,
              }}
            >
              <img
                src={slide.image}
                alt="Hero"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.03)', transition: 'transform 6s ease' }}
              />
              <div className="hero-gradient" style={{ position: 'absolute', inset: 0 }} />
            </div>
          ))}

          {/* Hero Content */}
          <div
            className="sivili-container"
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="fade-in" key={heroIndex}>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(212,169,106,0.15)',
                  border: '1px solid rgba(212,169,106,0.4)',
                  color: '#D4A96A',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.35rem 0.875rem',
                  borderRadius: '999px',
                  marginBottom: '1rem',
                }}
              >
                ✦ Premium Quality Furniture
              </div>
              <h1
                style={{
                  color: 'white',
                  fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  fontFamily: 'Noto Serif Thai, Playfair Display, serif',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                  whiteSpace: 'pre-line',
                  maxWidth: '600px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {currentSlide.title}
              </h1>
              <p
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
                  maxWidth: '480px',
                  marginBottom: '2rem',
                  lineHeight: 1.65,
                }}
              >
                {currentSlide.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/catalog" className="btn-primary" style={{ background: '#D4A96A', borderColor: '#D4A96A', color: 'white', fontSize: '1rem', padding: '0.75rem 2rem' }}>
                  {t('hero_cta')} <ArrowRight size={18} />
                </Link>
                <Link href="/catalog?featured=true" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.6)', color: 'white', fontSize: '1rem', padding: '0.75rem 2rem' }}>
                  {t('hero_cta2')}
                </Link>
              </div>
            </div>
          </div>

          {/* Slide Dots */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', gap: '0.5rem' }}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                style={{
                  width: i === heroIndex ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  borderRadius: '999px',
                  background: i === heroIndex ? '#D4A96A' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </section>

        {/* ===== TRUST BADGES ===== */}
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

        {/* ===== CATEGORIES ===== */}
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

        {/* ===== FEATURED PRODUCTS ===== */}
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

        {/* ===== BANNER / PROMO ===== */}
        <section style={{ position: 'relative', overflow: 'hidden', margin: '0' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2B5EA7 100%)',
              padding: 'clamp(2.5rem, 6vw, 4rem) 0',
            }}
          >
            <div className="sivili-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(212,169,106,0.15)', border: '1px solid rgba(212,169,106,0.4)', color: '#D4A96A', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.875rem', borderRadius: '999px' }}>
                🎉 โปรโมชั่นพิเศษ
              </div>
              <h2 style={{ color: 'white', fontFamily: 'Noto Serif Thai, serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, margin: 0 }}>
                จัดส่งฟรีทั่วประเทศ<br />เมื่อซื้อครบ ฿5,000
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '400px', margin: 0 }}>
                ใช้โค้ด <strong style={{ color: '#D4A96A' }}>SIVILI2026</strong> รับส่วนลดเพิ่มอีก 10% สำหรับสมาชิกใหม่
              </p>
              <Link href="/catalog" className="btn-primary" style={{ background: '#D4A96A', borderColor: '#D4A96A', fontSize: '1rem', padding: '0.75rem 2rem' }}>
                {t('shop_now')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== NEW ARRIVALS ===== */}
        {newArrivals.length > 0 && (
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
        )}

        {/* ===== BRAND TRUST ===== */}
        <section className="section" style={{ background: '#F5F0E8' }}>
          <div className="sivili-container text-center">
            <h2 className="section-title mb-4">ทำไมต้องเลือก Sivili?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: '🪵',
                  title: 'วัสดุคุณภาพสูง',
                  desc: 'คัดสรรวัสดุชั้นดี ไม้แท้ เหล็กกล้า ผ้าพรีเมียม ทนทานนับสิบปี',
                },
                {
                  icon: '✏️',
                  title: 'ดีไซน์ทันสมัย',
                  desc: 'ออกแบบโดยทีมนักออกแบบมืออาชีพ ผสมผสานความคลาสสิกและความทันสมัย',
                },
                {
                  icon: '🛡️',
                  title: 'รับประกัน 1 ปี',
                  desc: 'รับประกันสินค้าทุกชิ้น บริการหลังการขายที่เชื่อถือได้ทั่วประเทศ',
                },
              ].map((item) => (
                <div key={item.title} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#5B6B7A', lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
