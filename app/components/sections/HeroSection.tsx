'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../LanguageProvider';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  data?: any;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { t, locale } = useLanguage();
  const [heroIndex, setHeroIndex] = useState(0);

  const defaultSlides = [
    {
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90',
      title: t('hero_title'),
      subtitle: t('hero_subtitle'),
    }
  ];

  const heroSlides = data?.slides && data.slides.length > 0 ? data.slides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[heroIndex] || heroSlides[0];

  return (
    <section style={{ position: 'relative', height: 'clamp(480px, 80vh, 700px)', overflow: 'hidden' }}>
      {/* Slides */}
      {heroSlides.map((slide: any, i: number) => (
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
              color: 'var(--color-primary, #D4A96A)',
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
              fontFamily: 'Kanit, sans-serif',
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
            <Link href="/catalog" className="btn-primary" style={{ background: 'var(--color-primary, #D4A96A)', borderColor: 'var(--color-primary, #D4A96A)', color: 'white', fontSize: '1rem', padding: '0.75rem 2rem' }}>
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
        {heroSlides.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setHeroIndex(i)}
            style={{
              width: i === heroIndex ? '2rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '999px',
              background: i === heroIndex ? 'var(--color-primary, #D4A96A)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
